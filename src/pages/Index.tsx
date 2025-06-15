
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/ProjectList";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { Settings, Users, FolderOpen } from "lucide-react";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            프로젝트 관리 플랫폼
          </h1>
          <p className="text-muted-foreground">
            각 프로젝트의 권한과 설정을 통합적으로 관리하세요
          </p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              프로젝트
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              권한 관리
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              설정 관리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <ProjectList 
              onProjectSelect={setSelectedProject}
              selectedProject={selectedProject}
            />
          </TabsContent>

          <TabsContent value="permissions" className="mt-6">
            <PermissionManager selectedProject={selectedProject} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsManager selectedProject={selectedProject} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
