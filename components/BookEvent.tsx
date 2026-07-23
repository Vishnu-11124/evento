"use client"
import { createBooking } from "@/lib/actions/booking.actions"
import posthog from "posthog-js";
import React, { useState } from "react"

const BookEvent = ({eventId, slug }: { eventId: string; slug: string}) => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  let booking = 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { success} = await createBooking({ eventId, slug, email})

    if(success){
      setSubmitted(true)
      posthog.capture('event-booked', { eventId, slug, email })
    }
    else{
      console.error("Booking creation failed")
      posthog.captureException("Booking creation failed")
    }
  }

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4">

      {/* BOOKINGS INFO */}
      {booking > 0 ? (
        <p className="text-sm text-zinc-300">
          Join <span className="text-purple-400 font-semibold">{booking}</span> people who already booked their spot!
        </p>
      ) : (
        <p className="text-sm text-zinc-300">
          Be the first to book your spot!
        </p>
      )}

      {/* FORM / SUCCESS */}
      {submitted ? (
        <div className="text-green-400 text-sm font-medium">
          🎉 Thank you! Your booking is confirmed.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-zinc-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-3 py-2 rounded-lg bg-black/40 border border-zinc-700 text-white outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium"
          >
            Submit Booking
          </button>

        </form>
      )}

    </div>
  )
}

export default BookEvent