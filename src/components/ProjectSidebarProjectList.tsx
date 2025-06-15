
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Folder, Users, Clock, Search, Sparkles } from "lucide-react";
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
    <SidebarGroupLabel className="text-xs tracking-wider font-bold text-muted-foreground pl-3 py-3 flex items-center gap-2">
      <Sparkles className="h-3 w-3" />
      프로젝트 목록
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu className="space-y-2">
        {filteredProjects.map((project, index) => (
          <SidebarMenuItem key={project.id}>
            <SidebarMenuButton
              onClick={() => onProjectSelect(project.id)}
              isActive={selectedProject === project.id}
              tooltip={undefined}
              className={`h-auto items-start rounded-xl p-4 border transition-all duration-300 hover:shadow-soft group animate-in
                ${
                  selectedProject === project.id
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 text-foreground border-primary/30 shadow-soft ring-1 ring-primary/20"
                    : "hover:bg-accent/50 hover:text-accent-foreground bg-background/60 border-border/50 hover:border-border hover:shadow-soft"
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105
                ${
                  selectedProject === project.id
                    ? "bg-primary/20 shadow-soft"
                    : "bg-secondary/80 group-hover:bg-secondary"
                }`}
              >
                <Folder
                  className={`h-4 w-4 transition-all duration-300
                    ${
                      selectedProject === project.id
                        ? "text-primary"
                        : "text-secondary-foreground group-hover:text-foreground"
                    }`}
                />
              </div>
              
              <div className="flex flex-col items-start min-w-0 flex-1 ml-3">
                <span
                  className={`font-semibold text-sm truncate w-full transition-colors duration-300 ${
                    selectedProject === project.id
                      ? "text-primary"
                      : "text-foreground group-hover:text-foreground"
                  }`}
                >
                  {project.name}
                </span>
                
                <p
                  className={`text-xs mt-1.5 line-clamp-2 transition-colors duration-300 ${
                    selectedProject === project.id
                      ? "text-foreground/70"
                      : "text-muted-foreground group-hover:text-foreground/80"
                  }`}
                >
                  {project.description}
                </p>
                
                <div
                  className={`flex items-center gap-4 text-xs mt-3 transition-colors duration-300 ${
                    selectedProject === project.id
                      ? "text-foreground/60"
                      : "text-muted-foreground group-hover:text-foreground/70"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    <span className="font-medium">{project.memberCount}명</span>
                  </div>
                  <span className="text-xs opacity-40">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>

                {selectedProject === project.id && (
                  <div className="mt-3 w-full">
                    <div className="h-0.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full animate-in"></div>
                  </div>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 px-4 animate-in">
          <div className="p-4 bg-secondary/50 text-muted-foreground rounded-xl w-fit mx-auto mb-4">
            <Search className="h-8 w-8" />
          </div>
          <p className="text-foreground text-sm font-medium mb-2">
            검색 결과가 없습니다
          </p>
          <p className="text-muted-foreground text-xs">
            다른 키워드로 검색해보세요
          </p>
        </div>
      )}
    </SidebarGroupContent>
  </SidebarGroup>
);
