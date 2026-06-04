import { Document, model, models, Schema, Types } from "mongoose";
import Event from "./event.model";

interface Booking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchema = new Schema<Booking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: [true, "Event ID is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            validate: {
                validator: function(email: string) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                },
                message: "Please enter a valid email address"
            }
        }
    },
    {
        timestamps: true
    }
)

bookingSchema.pre('save', async function(){
    const booking = this as Booking;
    
    if(booking.isModified('eventId') || booking.isNew){
        try {
            const eventExists = await Event.findById(booking.eventId).select('_id');

            if(!eventExists){
                const error = new Error(`Event with ID ${booking.eventId} does not exist`);
                throw error;
            }
        } catch (error) {
            const err = error as Error;
            throw new Error(`Error validating event ID: ${err.message}`);
        }
    }
})

bookingSchema.index({eventId: 1})

bookingSchema.index({eventId: 1, createdAt: -1})

bookingSchema.index({email: 1})

const Booking = models.Booking || model<Booking>("Booking", bookingSchema);

export default Booking;