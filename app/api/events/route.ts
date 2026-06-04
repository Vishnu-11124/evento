import Event from "@/database/event.model";
import connectToDatabase from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const createdEvent = await Event.create(body);

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          id: createdEvent._id,
          title: createdEvent.title,
          slug: createdEvent.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        message: "Event creation failed",
        error: message,
      },
      { status: 500 }
    );
  }
}