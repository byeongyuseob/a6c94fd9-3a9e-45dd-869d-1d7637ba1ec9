
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Folder, Users } from "lucide-react";
import { Project } from "@/types/project";

interface Props {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: string | null;
  isCollapsed: boolean;
  onProjectSelect: (projectId: string) => void;
}

export const ProjectSidebarProjectList = ({
  projects,
  filteredProjects,
  selectedProject,
  isCollapsed,
  onProjectSelect,
}: Props) => (
  <SidebarGroup>
    {!isCollapsed && (
      <SidebarGroupLabel className="text-xs tracking-wider font-bold text-muted-foreground pl-2">
        프로젝트 목록
      </SidebarGroupLabel>
    )}
    <SidebarGroupContent>
      <SidebarMenu>
        {filteredProjects.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              onClick={() => onProjectSelect(project.id)}
              isActive={selectedProject === project.id}
              tooltip={isCollapsed ? project.name : undefined}
              className={
                `transition-colors group relative h-auto items-start rounded-xl px-3 py-2.5 
                ${selectedProject === project.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-accent"}`
              }
            >
              <Folder 
                className={`h-5 w-5 flex-shrink-0 transition-colors 
                  ${selectedProject === project.id ? "text-primary-foreground" : "text-muted-foreground"}`
                } 
              />
              {!isCollapsed && (
                <div className="flex flex-col items-start min-w-0 flex-1 ml-3">
                  <span className="font-semibold text-base truncate w-full">
                    {project.name}
                  </span>
                  <div className={`flex items-center gap-2 text-xs ${selectedProject === project.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.memberCount}명
                    </div>
                    <span>•</span>
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      {!isCollapsed && filteredProjects.length === 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground text-sm">검색 결과가 없습니다.</p>
        </div>
      )}
    </SidebarGroupContent>
  </SidebarGroup>
);
