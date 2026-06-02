import EventCard from "@/components/EventCard";
import ExploreButtons from "@/components/ExploreButtons";
import LightRays from "@/components/LightRays";

const events = [
  {
    image: "https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&auto=format&fit=crop",
    title: "Tech Innovators Summit 2024",
    slug: "tech-innovators-summit-2024",
    location: "New York, NY",
    date: "2024-07-15",
    time: "9:00 AM - 6:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    title: "Global Music Festival",
    slug: "global-music-festival",
    location: "Austin, TX",
    date: "2024-08-03",
    time: "4:00 PM - 11:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=800&auto=format&fit=crop",
    title: "UI/UX Design Workshop",
    slug: "ui-ux-design-workshop",
    location: "San Francisco, CA",
    date: "2024-08-20",
    time: "10:00 AM - 3:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
    title: "Startup Networking Night",
    slug: "startup-networking-night",
    location: "Chicago, IL",
    date: "2024-09-05",
    time: "6:00 PM - 9:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop",
    title: "Women in Tech Conference",
    slug: "women-in-tech-conference",
    location: "Seattle, WA",
    date: "2024-09-18",
    time: "9:00 AM - 5:00 PM",
  },
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
    title: "Food & Culture Carnival",
    slug: "food-culture-carnival",
    location: "Miami, FL",
    date: "2024-10-12",
    time: "12:00 PM - 8:00 PM",
  },
];

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      
      {/* Background Rays */}
      <div className="absolute inset-0 opacity-70">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          raysSpeed={1}
          lightSpread={1.5}
          rayLength={2}
          pulsating
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        
        <span className="mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
          🎉 Discover Amazing Events Around You
        </span>

        <h1 className="max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
          The Hub For
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            {" "}Every Event
          </span>
          <br />
          You Mustn't Miss
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
          Discover hackathons, meetups, conferences, workshops, and networking
          events happening around you — all in one place.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ExploreButtons />
        </div>

        <div className="px-4 py-10">
  <p className="text-xs font-medium tracking-widest text-violet-400 uppercase mb-1">
    Upcoming
  </p>
  <h2 className="text-3xl font-medium text-white mb-8">Featured Events</h2>
  <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {events.map((event) => (
      <li key={event.title}>
        <EventCard {...event} />
      </li>
    ))}
  </ul>
</div>

        
      </section>
    </main>
  );
};

export default HomePage;