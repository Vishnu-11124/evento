import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
import { allEventsCall } from "@/lib/actions/events";

const Events = async () => {
  const result = await allEventsCall()

  if (!result.success) {
    return <div>Failed to load events.</div>;
  }

  const events = result.data

  return (
    <section className="min-h-screen bg-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          {/* <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Explore Events
          </h1> */}

          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Discover exciting events happening around you. Find your next
            adventure, workshop, concert, or meetup.
          </p>
        </div>

        {/* Event Grid */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Events;