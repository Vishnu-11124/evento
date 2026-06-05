import mongoose, { HydratedDocument, Schema } from "mongoose";

interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: Date | string;
  time: string;
  mode: "Online" | "In-Person" | "Hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Provide a title for the event"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Provide a description for the event"],
      trim: true,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    overview: {
      type: String,
      trim: true,
      required: [true, "Provide an overview for the event"],
      maxlength: [500, "Overview cannot be more than 500 characters"],
    },
    image: {
      type: String,
      required: [true, "Provide an image URL for the event"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Provide a venue for the event"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Provide a location for the event"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Provide a date for the event"],
    },
    time: {
      type: String,
      required: [true, "Provide a time for the event"],
    },
    mode: {
      type: String,
      required: [true, "Provide a mode for the event"],
      enum: {
        values: ["Online", "In-Person", "Hybrid"],
        message: "Mode must be either Online, In-Person, or Hybrid",
      },
    },
    audience: {
      type: String,
      required: [true, "Provide an audience for the event"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Provide an agenda for the event"],
      validate: {
        validator: (value: string[]) =>
          value.length > 0 && value.every((item) => item.trim().length > 0),
        message: "Agenda must have at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Provide an organizer for the event"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Provide tags for the event"],
      validate: {
        validator: (value: string[]) =>
          value.every((item) => item.trim().length > 0),
        message: "Tags must have at least one item",
      },
    },
  },
  {
    timestamps: true,
  },
);

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

function normalizeDate(date: Date | string): Date {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format");
  }

  return dateObj;
}

function normalizeTime(time: string): string {
  const timeRegex = /^([0-9]{1,2}):([0-9]{2})\s?(AM|PM)$/i;

  const match = time.trim().match(timeRegex);

  if (!match) {
    throw new Error("Invalid time format. Use HH:MM");
  }

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time");
  }

  return `${hours.toString().padStart(2, "0")}:${match[2]}`;
}

// slug generation and data normalization
eventSchema.pre("validate", function () {
  const event = this as HydratedDocument<IEvent>;
  if (event.isModified("title") || event.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified("date")) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified("time")) {
    event.time = normalizeTime(event.time);
  }
});

// eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ date: 1, mode: 1 });

const Event =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default Event;
