
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { FolderOpen } from "lucide-react";
import { ProjectSidebarProjectList } from "@/components/ProjectSidebarProjectList";
import { ProjectSidebarCreateDialog } from "@/components/ProjectSidebarCreateDialog";
import { SidebarSkeleton } from "@/components/LoadingStates";
import { useProjectSidebar } from "@/hooks/useProjectSidebar";
import { Project } from "@/types/project";

interface ProjectSidebarProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

export const ProjectSidebar = ({
  onProjectSelect,
  selectedProject,
}: ProjectSidebarProps) => {
  const { isLoading, projects, handleCreateProject, handleUpdateProject, handleDeleteProject } = useProjectSidebar({ onProjectSelect });

  return (
    <Sidebar
      variant="inset"
      className="bg-background/95 backdrop-blur-sm border-r shadow-soft"
      aria-label="프로젝트 사이드바"
    >
      <SidebarHeader className="border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-soft">
              <FolderOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              ProjectHub
            </span>
          </div>
          {!isLoading && projects.length > 0 && (
            <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              {projects.length}/{projects.length}
            </div>
          )}
        </div>
        <div className="px-4 pb-4">
          <ProjectSidebarCreateDialog onCreate={handleCreateProject} />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/40" role="region" aria-label="프로젝트 리스트 컨테이너">
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          <ProjectSidebarProjectList
            projects={projects}
            filteredProjects={projects}
            selectedProject={selectedProject}
            isCollapsed={false}
            onProjectSelect={onProjectSelect}
            onProjectUpdate={handleUpdateProject}
            onProjectDelete={handleDeleteProject}
            aria-label="프로젝트 리스트"
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
};
