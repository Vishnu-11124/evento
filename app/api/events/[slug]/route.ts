import Event from "@/database/event.model";
import connectToDatabase from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await connectToDatabase();
        const paramsResolved = await params; // unwrap the Promise
        const { slug } = paramsResolved;
        // console.log("slug", slug);

        const event = await Event.findOne({ slug }).lean();

        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch event", error },
            { status: 500 }
        );
    }
}