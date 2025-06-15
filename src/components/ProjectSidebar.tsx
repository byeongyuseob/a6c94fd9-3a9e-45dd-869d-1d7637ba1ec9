
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FolderOpen, Search, Plus } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { ProjectSidebarProjectList } from "@/components/ProjectSidebarProjectList";
import { ProjectSidebarCreateDialog } from "@/components/ProjectSidebarCreateDialog";
import { Project } from "@/types/project";

interface ProjectSidebarProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

export const ProjectSidebar = ({
  onProjectSelect,
  selectedProject,
}: ProjectSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "웹 애플리케이션",
      description: "메인 웹 애플리케이션 프로젝트",
      lastUpdated: "2024-06-15",
      memberCount: 12,
    },
    {
      id: "2",
      name: "모바일 앱",
      description: "iOS/Android 모바일 애플리케이션",
      lastUpdated: "2024-06-14",
      memberCount: 8,
    },
    {
      id: "3",
      name: "API 서버",
      description: "백엔드 API 서버 프로젝트",
      lastUpdated: "2024-06-13",
      memberCount: 5,
    },
  ]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <Sidebar
      variant="inset"
      className="bg-background/95 backdrop-blur-sm border-r shadow-soft"
    >
      <SidebarHeader className="border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-soft">
              <FolderOpen className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              프로젝트
            </span>
          </div>
          {projects.length > 0 && (
            <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              {projects.length}
            </div>
          )}
        </div>
        
        <div className="px-4 pb-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="프로젝트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <ProjectSidebarCreateDialog onCreate={handleCreateProject} />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/40">
        <ProjectSidebarProjectList
          projects={projects}
          filteredProjects={filteredProjects}
          selectedProject={selectedProject}
          isCollapsed={false}
          onProjectSelect={onProjectSelect}
        />
      </SidebarContent>
    </Sidebar>
  );
};
