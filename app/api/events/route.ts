import Event from "@/database/event.model";
import connectToDatabase from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    // Required fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !description || !imageFile) {
      return NextResponse.json(
        { message: "Title, description and image are required" },
        { status: 400 }
      );
    }

    // Convert file → buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "events",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Helper to convert comma-separated strings → array
    const toArray = (value: FormDataEntryValue | null) =>
      value ? (value as string).split(",").map((v) => v.trim()) : [];

    // Create event
    const createdEvent = await Event.create({
      title,
      description,
      overview: formData.get("overview") || "",
      image: uploadResult.secure_url,

      venue: formData.get("venue") || "",
      location: formData.get("location") || "",
      date: formData.get("date") || "",
      time: formData.get("time") || "",
      mode: formData.get("mode") || "",
      audience: formData.get("audience") || "",
      organizer: formData.get("organizer") || "",

      agenda: toArray(formData.get("agenda")),
      tags: toArray(formData.get("tags")),
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (error: any) {
  console.log("🔥 FULL ERROR OBJECT:");
  console.dir(error, { depth: null });

  return NextResponse.json(
    {
      message: "Event creation failed",
      error: error?.message || error,
      stack: error?.stack,
    },
    { status: 500 }
  );
}
}

export async function GET() {
  try {
    await connectToDatabase();

    const events = await Event.find();

    if(!events || events.length === 0) {  
      return NextResponse.json(
        { message: "No events found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events", error },
      { status: 500 }
    );
  }
}

