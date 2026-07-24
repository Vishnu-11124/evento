"use server"

import Event from "@/database/event.model"
import connectToDatabase from "@/utils/dbConnect"

export const allEventsCall = async () => {
    await connectToDatabase()

    const events = await Event.find().lean()

    if(!events){
        return { success: false, data: [] }
    }

    return { success: true, data: events }
}