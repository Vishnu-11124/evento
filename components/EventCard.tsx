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
      <div className="group bg-[#111118] border border-[#2a2438] rounded-[14px] overflow-hidden hover:border-violet-600 hover:-translate-y-0.5 transition-all duration-200">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        <div className="p-4">
          {category && (
            <span className="inline-block text-[10px] font-medium bg-[#2a1f4a] text-violet-300 rounded-md px-2 py-0.5 mb-2">
              {category}
            </span>
          )}
          <div className="flex items-center gap-1 text-violet-400 text-xs mb-2">
            <MapPin size={13} />
            <span>{location}</span>
          </div>
          <h3 className="text-white font-medium text-[15px] leading-snug mb-3">{title}</h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#837a9e] text-xs">
              <Calendar size={13} className="text-violet-700" />
              <span>{date instanceof Date ? date.toDateString() : date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#837a9e] text-xs">
              <Clock size={13} className="text-violet-700" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;