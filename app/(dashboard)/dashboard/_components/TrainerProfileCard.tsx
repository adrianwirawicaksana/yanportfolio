import Image from "next/image";
import { memo } from "react";

interface TrainerProfileCardProps {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  isLoading: boolean;
}

function TrainerProfileCardComponent({
  name,
  email,
  bio,
  avatarUrl,
  isLoading,
}: TrainerProfileCardProps) {
  return (
    <div className="flex-1 w-full flex flex-col gap-4 lg:gap-6 items-center justify-start p-4 md:pb-8 lg:pb-10">
      <div className="h-36 w-36 md:h-44 md:w-44 lg:h-50 lg:w-50 relative bg-linear-to-t from-gray-200 to-white border-3 lg:border-6 border-yellow-500 rounded-full overflow-hidden shadow-sm mx-auto">
        <Image
          src={avatarUrl}
          alt="Trainer Avatar"
          fill
          sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 200px"
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center gap-1 px-4 text-center w-full">
        <h1 className="text-lg md:text-xl leading-snug">
          Welcome!
          <br />
          <span className={`font-title font-bold text-2xl sm:text-3xl lg:text-4xl text-blue-600 ${isLoading ? "animate-pulse" : ""}`}>
            {name}
          </span>
        </h1>
        <p className={`text-sm sm:text-base text-red-500 font-bold ${isLoading ? "animate-pulse" : ""}`}>
          {email}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 max-w-full md:max-w-xs mt-1 leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  );
}

export const TrainerProfileCard = memo(TrainerProfileCardComponent);
