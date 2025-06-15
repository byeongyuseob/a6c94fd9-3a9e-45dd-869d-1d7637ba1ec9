
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Settings, Users, Sparkles, FolderOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
        
        <SidebarInset className="flex-1">
          <header className="flex h-20 shrink-0 items-center justify-between gap-2 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-40 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-medium">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  프로젝트 관리 플랫폼
                </h1>
                <p className="text-sm text-muted-foreground">
                  효율적인 프로젝트 관리를 위한 통합 솔루션
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedProject && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  활성 프로젝트
                </div>
              )}
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 animate-in">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-3">
                <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
                  <FolderOpen className="h-5 w-5" />
                </div>
                대시보드
              </h2>
              <p className="text-muted-foreground">
                {selectedProject 
                  ? "선택된 프로젝트의 권한과 설정을 관리하세요" 
                  : "시작하려면 왼쪽에서 프로젝트를 선택해주세요"
                }
              </p>
            </div>

            {selectedProject ? (
              <div className="bg-background/60 backdrop-blur-sm rounded-xl border shadow-soft animate-in">
                <Tabs defaultValue="permissions" className="w-full">
                  <div className="border-b px-6 py-4 bg-background/40 rounded-t-xl">
                    <TabsList className="bg-secondary/50 backdrop-blur-sm">
                      <TabsTrigger 
                        value="permissions" 
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
                      >
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">권한 관리</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="settings" 
                        className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="hidden sm:inline">설정 관리</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="permissions" className="p-4 md:p-6 m-0 animate-in">
                    <PermissionManager selectedProject={selectedProject} />
                  </TabsContent>

                  <TabsContent value="settings" className="p-4 md:p-6 m-0 animate-in">
                    <SettingsManager selectedProject={selectedProject} />
                  </TabsContent>
                </Tabs>
              </div>
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
