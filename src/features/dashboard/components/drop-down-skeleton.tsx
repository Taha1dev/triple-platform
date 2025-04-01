import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonDropdown = () => {
  return (
    <div className="flex flex-col gap-2 p-2 border border-border rounded-lg">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-10 w-full rounded" />
    </div>
  );
};
