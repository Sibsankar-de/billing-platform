import React from "react";
import { cn } from "../utils";
import { UserRound } from "lucide-react";

type AvatarProps = {
  src?: string;
  userName?: string;
  className?: string;
  fallbackClass?: string;
  size?: number;
};

function getAvatarFallback(name: string): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // Single word case
  return words[0].slice(0, 2).toUpperCase();
}

export const Avatar = ({
  src,
  userName,
  className,
  size,
  fallbackClass,
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "w-12 h-12 relative rounded-full overflow-hidden",
        className
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {src && (
        <img src={src} className="w-full h-full rounded-full" alt={userName} />
      )}

      {!src && userName && (
        <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
          <span className={cn("text-3xl font-bold", fallbackClass)}>
            {getAvatarFallback(userName || "")}
          </span>
        </div>
      )}

      {!src && !userName && (
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
          <UserRound className="w-[60%] h-[60%]" />
        </div>
      )}
    </div>
  );
};
