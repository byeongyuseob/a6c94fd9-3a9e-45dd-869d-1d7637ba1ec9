
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Settings } from "lucide-react";
// Logo import 주석 처리 또는 삭제
// import { Logo } from "@/components/Logo";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { NotificationPanel } from "@/components/NotificationPanel";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  selectedProject: string | null;
  currentSection?: string;
}

export const Header = ({ selectedProject, currentSection }: HeaderProps) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-50 shadow-sm"
      aria-label="상단 헤더"
      role="banner"
    >
      <div className="flex items-center gap-4 min-w-0">
        <SidebarTrigger className="h-7 w-7" aria-label="사이드바 열기" />
        {/* <Logo size="sm" className="hidden md:flex" /> 삭제 */}
        <div className="hidden lg:block min-w-0 w-auto overflow-x-auto">
          <BreadcrumbNav
            selectedProject={selectedProject}
            currentSection={currentSection}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
          aria-label="테마 전환"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">테마 전환</span>
        </Button>

        <NotificationPanel />

        <KeyboardShortcutsHelp />

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="설정"
        >
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
