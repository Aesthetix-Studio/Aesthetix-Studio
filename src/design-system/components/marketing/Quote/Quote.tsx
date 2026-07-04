import React from "react";
import { cn } from "../../../utils";

interface QuoteProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  className?: string;
}

export function Quote({
  quote,
  author,
  role,
  company,
  avatar,
  rating,
  className,
}: QuoteProps) {
  return (
    <figure className={cn("", className)}>
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-5 h-5",
                i < rating ? "text-[var(--craft)]" : "text-zinc-200 dark:text-zinc-700"
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      <blockquote className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        "{quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-medium text-sm text-[var(--neutral-950)] dark:text-white">
            {author}
          </p>
          {(role || company) && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {role}
              {role && company && " · "}
              {company}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
