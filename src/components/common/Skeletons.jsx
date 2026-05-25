export function BookCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[2/3] shimmer" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 shimmer rounded-full w-16" />
        <div className="h-4 shimmer rounded-full w-4/5" />
        <div className="h-3.5 shimmer rounded-full w-3/5" />
        <div className="h-3 shimmer rounded-full w-2/5" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}