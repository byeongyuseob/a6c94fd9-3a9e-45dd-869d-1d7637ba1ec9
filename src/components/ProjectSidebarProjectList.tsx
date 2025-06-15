
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Folder, Users, Clock, Search } from "lucide-react";
import { Project } from "@/types/project";

interface Props {
  projects: Project[];
  filteredProjects: Project[];
  selectedProject: string | null;
  isCollapsed: boolean;
  onProjectSelect: (projectId: string) => void;
}

export const ProjectSidebarProjectList = ({
  filteredProjects,
  selectedProject,
  onProjectSelect,
}: Props) => (
  <SidebarGroup className="px-4 py-2">
    <SidebarGroupLabel className="text-xs tracking-wider font-bold text-muted-foreground pl-3 py-3">
      프로젝트 목록
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu className="space-y-1">
        {filteredProjects.map((project) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              onClick={() => onProjectSelect(project.id)}
              isActive={selectedProject === project.id}
              tooltip={undefined}
              className={`h-auto items-start rounded-lg p-3 border transition-all duration-200
                ${
                  selectedProject === project.id
                    ? "bg-primary/10 text-foreground border-primary/20 shadow-sm"
                    : "hover:bg-accent hover:text-accent-foreground bg-background border-border"
                }`}
            >
              <div className={`p-2 rounded-lg flex-shrink-0 transition-colors duration-200
                ${
                  selectedProject === project.id
                    ? "bg-primary/20"
                    : "bg-secondary"
                }`}
              >
                <Folder
                  className={`h-4 w-4 transition-colors duration-200
                    ${
                      selectedProject === project.id
                        ? "text-primary"
                        : "text-secondary-foreground"
                    }`}
                />
              </div>
              
              <div className="flex flex-col items-start min-w-0 flex-1 ml-3">
                <span
                  className={`font-semibold text-sm truncate w-full transition-colors duration-200 ${
                    selectedProject === project.id
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {project.name}
                </span>
                
                <p
                  className={`text-xs mt-1 line-clamp-2 transition-colors duration-200 ${
                    selectedProject === project.id
                      ? "text-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {project.description}
                </p>
                
                <div
                  className={`flex items-center gap-3 text-xs mt-2 transition-colors duration-200 ${
                    selectedProject === project.id
                      ? "text-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="font-medium">{project.memberCount}명</span>
                  </div>
                  <span className="text-xs opacity-60">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {filteredProjects.length === 0 && (
        <div className="text-center py-8 px-4">
          <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-foreground text-sm font-medium">
            검색 결과가 없습니다
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            다른 키워드로 검색해보세요
          </p>
        </div>
      )}
    </SidebarGroupContent>
  </SidebarGroup>
);
