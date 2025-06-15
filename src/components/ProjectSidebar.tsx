
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FolderOpen, Search } from "lucide-react";
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
      className="!bg-sidebar/95 shadow-xl rounded-r-2xl border-r border-sidebar-border w-72 min-w-[210px] max-w-[320px] flex-shrink-0" // <-- 핵심: flex-shrink-0 추가
    >
      <SidebarHeader>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight select-none text-sidebar-foreground">
              프로젝트
            </span>
          </div>
        </div>
        <div className="px-3 pt-1 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="프로젝트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 rounded-lg border-sidebar-border bg-sidebar-accent"
            />
          </div>
        </div>
        <div className="px-3 pb-2">
          <ProjectSidebarCreateDialog onCreate={handleCreateProject} />
        </div>
      </SidebarHeader>

      <SidebarContent>
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
