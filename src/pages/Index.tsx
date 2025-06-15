import { useState, useEffect, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Settings, Users, FolderOpen } from "lucide-react";
import { PageLoader, TabContentSkeleton } from "@/components/LoadingStates";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useNotifications } from "@/contexts/NotificationContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProjectTabPanel } from "@/components/ProjectTabPanel";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string>("대시보드");
  const [currentTab, setCurrentTab] = useState<string>("permissions");
  const [isLoading, setIsLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { addNotification } = useNotifications();

  useEffect(() => {
    // 초기 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setTabLoading(true);
    setCurrentTab(value);
    setCurrentSection(value === "permissions" ? "권한 관리" : "설정 관리");
    setTimeout(() => {
      setTabLoading(false);
    }, 500);
  }, []);

  // 키보드 단축키 설정(접근성 강화)
  useKeyboardShortcuts([
    {
      key: '/',
      callback: () => {
        // 검색에 포커스 (사이드바의 검색 필드)
        const searchInput = document.querySelector('input[placeholder*="검색"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: '검색에 포커스',
    },
    {
      key: 'Tab',
      callback: () => {
        // 탭 간 이동
        if (selectedProject) {
          const newTab = currentTab === "permissions" ? "settings" : "permissions";
          handleTabChange(newTab);
        }
      },
      description: '탭 간 이동',
    },
    {
      key: 'Escape',
      callback: () => {
        const activeModal = document.querySelector('[role="dialog"]');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="Close"], [aria-label*="닫기"]') as HTMLButtonElement;
          if (closeButton) {
            closeButton.click();
          }
        }
      },
      description: '대화상자 닫기',
    },
    {
      key: '?',
      callback: () => {
        // 키보드 단축키 도움말 표시 (버튼에 aria-label 명확화)
        const helpButton = document.querySelector('[aria-label*="키보드"]') as HTMLButtonElement;
        if (helpButton) {
          helpButton.click();
        }
      },
      description: '단축키 도움말 표시',
    },
  ]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="min-h-screen flex w-full bg-gradient-to-br from-background via-secondary/20 to-background"
        style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
        aria-label="메인 대시보드 레이아웃"
      >
        <ProjectSidebar
          onProjectSelect={setSelectedProject}
          selectedProject={selectedProject}
        />

        <SidebarInset className="flex-1 min-w-0">
          <Header
            selectedProject={selectedProject}
            currentSection={currentSection}
          />

          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 animate-in" role="main">
            <DashboardHeader selectedProject={selectedProject} />

            {selectedProject ? (
              <ProjectTabPanel
                selectedProject={selectedProject}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                setCurrentSection={setCurrentSection}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center p-4">
                <div className="text-center rounded-xl border bg-background/60 backdrop-blur-sm p-8 md:p-12 max-w-md shadow-soft animate-in">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-xl w-fit mx-auto mb-6 shadow-soft">
                    <FolderOpen className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                    프로젝트를 선택하세요
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    왼쪽 사이드바에서 프로젝트를 선택하여<br />
                    관리를 시작하세요.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      권한 관리
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      설정 관리
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      API 테스트
                    </span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;

// 파일이 209줄로 매우 깁니다. 추가적인 분할 리팩토링을 권장합니다.
