"use client";

import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import { Diner } from "@/types";

interface DinerCardProps {
  diner: Diner;
  onEditClick: (diner: Diner) => void;
  onClick: () => void;
  className?: string;
}

export function DinerCard({
  diner,
  onEditClick,
  onClick,
  className = "",
}: DinerCardProps) {
  return (
    <div
      className={`bg-sage-light/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-sage-primary/10 hover:border-sage-primary/20 hover:-translate-y-2 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative h-48 mb-4 rounded-t-xl overflow-hidden bg-sage-light/50 transition-transform duration-200 group-hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/80 to-transparent" />
        {diner.imageUrl ? (
          <img
            src={diner.imageUrl}
            alt={diner.name}
            className="w-full h-full object-cover transition-transform duration-500 scale-105 group-hover:scale-100"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <UserIcon className="h-16 w-16 text-charcoal" />
            </div>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(diner);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-sage-light hover:bg-sage-light active:bg-sage-light/90 backdrop-blur-sm text-charcoal hover:text-charcoal active:text-charcoal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-deep/50 border border-sage-primary/10 hover:border-sage-primary/20 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
          aria-label={`Edit ${diner.name}'s profile`}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-charcoal mb-2 tracking-tight group-hover:text-charcoal transition-colors duration-200">
          {diner.name}
        </h3>
      </div>
    </div>
  );
}
