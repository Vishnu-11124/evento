import Event from "@/database/event.model";
import connectToDatabase from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;

    const event = await Event.findOne({ slug }).lean();
    // console.log("event", event)

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", relatedEvents: [] },
        { status: 404 }
      );
    }

    const relatedEvents = await Event.find({
      _id: { $ne: event._id }, // exclude current event
      tags: { $in: event.tags }
    })
      .limit(3)
      .lean();

    //   console.log("Related:" ,relatedEvents)

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        relatedEvents
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch event", error },
      { status: 500 }
    );
  }
}