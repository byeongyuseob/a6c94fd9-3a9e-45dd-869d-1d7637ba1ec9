
import { useState, useEffect, useCallback } from "react";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { Header } from "@/components/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FolderOpen } from "lucide-react";
import { PageLoader } from "@/components/LoadingStates";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProjectTabPanel } from "@/components/ProjectTabPanel";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string>("대시보드");
  const [currentTab, setCurrentTab] = useState<string>("permissions");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setCurrentTab(value);
    setCurrentSection(value === "permissions" ? "권한 관리" : "설정 관리");
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="min-h-screen flex w-full bg-gradient-to-br from-background via-secondary/20 to-background"
        style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
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

          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 animate-in">
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
