export default function CartItemSkeleton() {
    return (
        <div className="flex items-start space-x-4 py-4 border-b last:border-0">
            <div className="h-24 w-24 bg-muted animate-pulse rounded-md"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-1/4"></div>
                <div className="h-8 bg-muted animate-pulse rounded w-1/3 mt-2"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-1/4 mt-1"></div>
            </div>
        </div>
    );
}
