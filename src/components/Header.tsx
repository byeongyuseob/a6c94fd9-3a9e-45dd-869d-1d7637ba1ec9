
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  selectedProject: string | null;
  currentSection?: string;
}

export const Header = ({
  selectedProject,
  currentSection
}: HeaderProps) => {
  const {
    isDark,
    toggleTheme
  } = useTheme();

  return <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-50 shadow-sm" aria-label="상단 헤더" role="banner">
      <div className="flex items-center gap-4 min-w-0">
        <div className="hidden lg:block min-w-0 w-auto overflow-x-auto">
          <BreadcrumbNav selectedProject={selectedProject} currentSection={currentSection} />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8" aria-label="테마 전환">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">테마 전환</span>
        </Button>
      </div>
    </header>;
};
