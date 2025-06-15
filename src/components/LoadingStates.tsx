
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export const ProjectCardSkeleton = () => (
  <div className="h-auto rounded-xl p-4 border bg-background/60 border-border/50 animate-pulse">
    <div className="flex items-start gap-3">
      <Skeleton className="p-2.5 rounded-xl flex-shrink-0 w-11 h-11" />
      <div className="flex flex-col items-start min-w-0 flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-3/4 mb-3" />
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  </div>
);

export const SidebarSkeleton = () => (
  <div className="space-y-2 p-4">
    {[...Array(3)].map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </div>
);

export const PageLoader = () => (
  <div className="flex flex-1 items-center justify-center p-4">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-sm text-muted-foreground">로딩 중...</p>
    </div>
  </div>
);

export const TabContentSkeleton = () => (
  <div className="space-y-4 p-6">
    <div className="space-y-2">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
