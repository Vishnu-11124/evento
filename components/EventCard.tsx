import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  slug?: string;
  location?: string;
  date?: Date | string;
  time?: string;
  category?: string;
}

const EventCard = ({ title, image, slug, location, date, time, category }: CardProps) => {
  return (
    <Link href={`/events/${slug}`}>
  <div className="group h-full flex flex-col bg-[#111118] border border-[#2a2438] rounded-[14px] overflow-hidden hover:border-violet-600 hover:-translate-y-0.5 transition-all duration-200">

    {/* IMAGE */}
    <img
      src={image}
      alt={title}
      className="w-full h-36 object-cover shrink-0"
    />

    {/* CONTENT */}
    <div className="p-4 flex flex-col flex-1">

      {/* CATEGORY */}
      {category && (
        <span className="inline-block text-[10px] font-medium bg-[#2a1f4a] text-violet-300 rounded-md px-2 py-0.5 mb-2 w-fit">
          {category}
        </span>
      )}

      {/* LOCATION (CLAMPED) */}
      <div className="flex items-start gap-1 text-violet-400 text-xs mb-2">
        <MapPin size={13} className="shrink-0 mt-0.5" />
        <span className="line-clamp-1 wrap-break-words">
          {location}
        </span>
      </div>

      {/* TITLE (CLAMPED TO 2 LINES) */}
      <h3 className="text-white font-medium text-[15px] leading-snug mb-3 line-clamp-2">
        {title}
      </h3>

      {/* DATE + TIME */}
      <div className="mt-auto flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[#837a9e] text-xs">
          <Calendar size={13} className="text-violet-700" />
          <span>
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#837a9e] text-xs">
          <Clock size={13} className="text-violet-700" />
          <span className="line-clamp-1">{time}</span>
        </div>
      </div>

    </div>
  </div>
</Link>
  );
};

export default EventCard;