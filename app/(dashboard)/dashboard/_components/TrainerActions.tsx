import Link from "next/link";
import { memo } from "react";

interface TrainerActionsProps {
  onLogout: () => void;
  isLoggingOut?: boolean;
}

function TrainerActionsComponent({ onLogout, isLoggingOut = false }: TrainerActionsProps) {
  return (
    <div className="w-full border-t-3 border-yellow-500 flex flex-col items-stretch justify-end gap-3 sm:gap-2.5 md:gap-3 px-3 sm:px-4 md:px-6 py-4 md:py-6 shrink-0">

      <Link
        href="/dashboard/setting/profile"
        className="block w-full text-center font-title font-bold text-base sm:text-lg py-2 sm:py-2.5 md:py-3 px-3 bg-linear-to-t from-gray-200 to-white border-2 sm:border-2 md:border-3 border-yellow-500 text-yellow-600 rounded-lg sm:rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out shadow-xs"
      >
        Edit Profile
      </Link>
      <Link
        href="/"
        className="block w-full text-center font-title font-bold text-base sm:text-lg py-2 sm:py-2.5 md:py-3 px-3 bg-linear-to-t from-blue-700 to-blue-500 border-2 sm:border-2 md:border-3 border-blue-700 text-white rounded-lg sm:rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out shadow-xs"
      >
        Back to Home
      </Link>
      <button
        type="button"
        onClick={onLogout}
        disabled={isLoggingOut}
        className={`block w-full text-center font-title font-bold text-base sm:text-lg py-2 sm:py-2.5 md:py-3 px-3 bg-linear-to-t from-red-600 to-red-500 border-2 sm:border-2 md:border-3 border-red-700 text-white rounded-lg sm:rounded-xl duration-300 transition-all ease-in-out shadow-xs ${isLoggingOut ? "opacity-60 cursor-not-allowed hover:scale-100" : "hover:scale-105 active:scale-95"}`}
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export const TrainerActions = memo(TrainerActionsComponent);
