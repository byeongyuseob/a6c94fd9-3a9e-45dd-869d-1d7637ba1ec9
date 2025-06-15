
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Settings, Users, Sparkles, FolderOpen } from "lucide-react";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-secondary/40">
        <ProjectSidebar 
          onProjectSelect={setSelectedProject}
          selectedProject={selectedProject}
        />
        
        <SidebarInset className="flex-1">
          <header className="flex h-20 shrink-0 items-center gap-2 border-b px-6 bg-background">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  프로젝트 관리 플랫폼
                </h1>
                <p className="text-sm text-muted-foreground">
                  효율적인 프로젝트 관리를 위한 통합 솔루션
                </p>
              </div>
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-6 p-6">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-primary" />
                대시보드
              </h2>
              <p className="text-muted-foreground">
                {selectedProject ? "선택된 프로젝트의 권한과 설정을 관리하세요" : "프로젝트를 선택해주세요"}
              </p>
            </div>

            {selectedProject ? (
              <div className="bg-background rounded-lg border">
                <Tabs defaultValue="permissions" className="w-full">
                  <div className="border-b px-6 py-3">
                    <TabsList>
                      <TabsTrigger 
                        value="permissions" 
                        className="flex items-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        권한 관리
                      </TabsTrigger>
                      <TabsTrigger 
                        value="settings" 
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        설정 관리
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="permissions" className="p-6 m-0">
                    <PermissionManager selectedProject={selectedProject} />
                  </TabsContent>

                  <TabsContent value="settings" className="p-6 m-0">
                    <SettingsManager selectedProject={selectedProject} />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center rounded-lg border p-12 max-w-md bg-background">
                  <div className="p-4 bg-primary/10 text-primary rounded-lg w-fit mx-auto mb-6">
                    <FolderOpen className="h-10 w-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    프로젝트를 선택하세요
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    왼쪽 사이드바에서 프로젝트를 선택하여<br />
                    관리를 시작하세요.
                  </p>
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
