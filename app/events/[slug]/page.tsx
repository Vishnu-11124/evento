import { CalendarIcon, ClockIcon, PersonStanding, PinIcon, Users2 } from 'lucide-react';
import { notFound } from 'next/navigation';

const PostDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`
  );

  const { event } = await request.json();

  if (!event) return notFound();

  const eventDetails = [
    {
      logo: CalendarIcon,
      label: new Date(event.date).toLocaleDateString()
    },
    {
      logo: ClockIcon,
      label: event.time
    },
    {
      logo: PinIcon,
      label: event.location
    },
    {
      logo: Users2,
      label: event.mode
    },
    {
      logo: PersonStanding,
      label: event.audience
    }
  ];

  return (
    <div>

      {/* HEADER */}
      <div>
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>

      {/* MAIN LAYOUT */}
      <div>

        {/* LEFT SIDE */}
        <div>

          <div>
            <img src={event.image} alt={event.title} />
          </div>

          <div>
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </div>

          <div>
            <h2>Event Details</h2>
            {eventDetails.map((detail, index) => (
              <div key={index}>
                <detail.logo />
                <span>{detail.label}</span>
              </div>
            ))}
          </div>

          <div>
            <h2>Agenda</h2>
            <ul>
              {event.agenda.map((item: string, index: number) => (
                <li key={index}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>About Organizer</h2>
            <p>{event.organizer}</p>
          </div>

          <div>
            {Array.isArray(event.tags) &&
              event.tags.map((tag: string, i: number) => (
                <span key={i}>{tag}</span>
              ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <aside>
          <p>Book Event</p>
          <button>Register</button>
          <p>Limited seats available</p>
        </aside>

      </div>
    </div>
  );
};

export default PostDetails;