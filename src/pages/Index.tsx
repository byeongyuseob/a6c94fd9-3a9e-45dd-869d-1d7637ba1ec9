
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, Users } from "lucide-react";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ProjectSidebar 
          onProjectSelect={setSelectedProject}
          selectedProject={selectedProject}
        />
        
        <SidebarInset>
          {/* 항상 보이는 헤더에 사이드바 트리거 */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold">프로젝트 관리 플랫폼</h1>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                대시보드
              </h2>
              <p className="text-muted-foreground">
                {selectedProject ? "선택된 프로젝트의 권한과 설정을 관리하세요" : "프로젝트를 선택해주세요"}
              </p>
            </div>

            {selectedProject ? (
              <Tabs defaultValue="permissions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="permissions" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    권한 관리
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    설정 관리
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="permissions" className="mt-6">
                  <PermissionManager selectedProject={selectedProject} />
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <SettingsManager selectedProject={selectedProject} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-lg">
                    왼쪽 사이드바에서 프로젝트를 선택하여 관리를 시작하세요.
                  </p>
                </div>
              </div>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
