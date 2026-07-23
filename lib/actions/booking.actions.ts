'use server'

import Booking from "@/database/booking.model";
import connectToDatabase from "@/utils/dbConnect";

export const createBooking = async ({ eventId, slug, email}: {eventId: string; slug: string; email: string}) => {
    try {
        await connectToDatabase()
        
        await Booking.create({ eventId, slug, email})

        return { success: true }

    } catch (error) {
        console.error('Create booking failed', error)
        return { success: false }
    }
}