
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Bell, Search, Settings } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  selectedProject: string | null;
  currentSection?: string;
}

export const Header = ({ selectedProject, currentSection }: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-7 w-7" />
        <Logo size="sm" className="hidden md:flex" />
        <div className="hidden lg:block">
          <BreadcrumbNav 
            selectedProject={selectedProject} 
            currentSection={currentSection}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검색..."
            className="w-64 pl-8 bg-background/50 border-border/50 focus:bg-background"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">테마 전환</span>
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
          <span className="sr-only">알림</span>
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">설정</span>
        </Button>

        {selectedProject && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium ml-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
            활성 프로젝트
          </div>
        )}
      </div>
    </header>
  );
};
