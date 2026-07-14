import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import {
  CalendarIcon,
  ClockIcon,
  PersonStanding,
  PinIcon,
  Users2,
} from "lucide-react";
import { notFound } from "next/navigation";

const PostDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`,
  );

  const { event } = await request.json();

  if (!event) return notFound();

  const eventDetails = [
    {
      logo: CalendarIcon,
      label: new Date(event.date).toLocaleDateString(),
    },
    { logo: ClockIcon, label: event.time },
    { logo: PinIcon, label: event.location },
    { logo: Users2, label: event.mode },
    { logo: PersonStanding, label: event.audience },
  ];

  const relatedEventsDetails = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}/related`,
  );

  const { relatedEvents } = await relatedEventsDetails.json();

  // console.log("relatedevents: ", relatedEventsDetails);
  return (
    <div className="min-h-screen pb-8 bg-linear-to-b from-black via-zinc-950 to-black text-white">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-2">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
          {event.title}
        </h1>

        {/* DESCRIPTION */}
        <h2 className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
          {event.description}
        </h2>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-105 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* OVERVIEW */}
          <section>
            <h3 className="text-xl font-semibold mb-2">Overview</h3>
            <p className="text-zinc-300 leading-relaxed">{event.overview}</p>
          </section>

          {/* DETAILS */}
          {/* <section className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {eventDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <detail.logo className="w-5 h-5 text-purple-400" />
                  <span>{detail.label}</span>
                </div>
              ))}
            </div>
          </section> */}

          {/* AGENDA */}
          <section>
            <h3 className="text-xl font-semibold mb-3">Agenda</h3>
            <ul className="space-y-2 text-zinc-300">
              {event.agenda.map((item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="text-purple-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* ORGANIZER */}
          <section className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-2">About Organizer</h3>
            <p className="text-zinc-300">{event.organizer}</p>
          </section>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(event.tags) &&
              event.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>

        {/* RIGHT SIDE - SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-10 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold">Book Event</h3>

            <BookEvent />

            <p className="text-sm text-zinc-400">
              Limited seats available. Reserve your spot before it fills up.
            </p>

            <div className="pt-4 border-t border-zinc-800 text-sm text-zinc-400">
              Secure checkout • Instant confirmation
            </div>
            {/* DETAILS */}
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xl font-semibold mb-4">Event Details</h3>

              <div className="flex flex-col gap-4">
                {eventDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-zinc-300 text-sm"
                  >
                    <detail.logo className="w-5 h-5 text-purple-400" />
                    <span>{detail.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedEvents &&
            relatedEvents.map((event: any) => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
