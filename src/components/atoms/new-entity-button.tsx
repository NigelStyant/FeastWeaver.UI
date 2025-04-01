"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface NewEntityButtonProps {
  entityType: string;
  className?: string;
}

export default function NewEntityButton({
  entityType,
  className = "",
}: NewEntityButtonProps) {
  const router = useRouter();
  const entityPath = entityType.toLowerCase() + "s";

  const handleClick = () => {
    router.push(`/${entityPath}/new`);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 bg-sage-deep text-white rounded-lg hover:bg-sage-deep/90 active:bg-sage-deep/80 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sage-deep/50 ${className}`}
    >
      <PlusIcon className="h-5 w-5" />
      <span>Add {entityType}</span>
    </button>
  );
}
