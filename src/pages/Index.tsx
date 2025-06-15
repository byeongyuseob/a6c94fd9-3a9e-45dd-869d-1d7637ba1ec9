
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <ProjectSidebar 
          onProjectSelect={setSelectedProject}
          selectedProject={selectedProject}
        />
        
        <SidebarInset className="flex-1">
          <header className="flex h-20 shrink-0 items-center gap-2 border-b border-slate-200/50 px-6 bg-white/80 backdrop-blur-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  프로젝트 관리 플랫폼
                </h1>
                <p className="text-sm text-slate-500">
                  효율적인 프로젝트 관리를 위한 통합 솔루션
                </p>
              </div>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-slate-800 mb-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-4 w-4 text-white" />
                </div>
                대시보드
              </h2>
              <p className="text-slate-600 text-lg">
                {selectedProject ? "선택된 프로젝트의 권한과 설정을 관리하세요" : "프로젝트를 선택해주세요"}
              </p>
            </div>

            {selectedProject ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
                <Tabs defaultValue="permissions" className="w-full">
                  <div className="border-b border-slate-200/50 bg-gradient-to-r from-white to-slate-50/50 px-6 py-4">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-100/80 p-1 rounded-xl">
                      <TabsTrigger 
                        value="permissions" 
                        className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                      >
                        <Users className="h-4 w-4" />
                        권한 관리
                      </TabsTrigger>
                      <TabsTrigger 
                        value="settings" 
                        className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
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
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-200/50 max-w-md">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl w-fit mx-auto mb-6">
                    <FolderOpen className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    프로젝트를 선택하세요
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    왼쪽 사이드바에서 프로젝트를 선택하여<br />
                    관리를 시작하세요.
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
