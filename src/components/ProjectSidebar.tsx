
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Plus, Search, FolderOpen, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  memberCount: number;
}

interface ProjectSidebarProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

export const ProjectSidebar = ({ onProjectSelect, selectedProject }: ProjectSidebarProps) => {
  const { toast } = useToast();
  const { state } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

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

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "오류",
        description: "프로젝트 이름을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      lastUpdated: new Date().toISOString().split('T')[0],
      memberCount: 1,
    };

    setProjects([...projects, project]);
    setNewProject({ name: "", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "성공",
      description: "새 프로젝트가 생성되었습니다.",
    });
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-2 p-2">
              <FolderOpen className="h-5 w-5" />
              <span className="font-semibold">프로젝트</span>
            </div>
            
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="프로젝트 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-8"
                />
              </div>
            </div>

            <div className="p-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    새 프로젝트
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>새 프로젝트 생성</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">프로젝트 이름</Label>
                      <Input
                        id="name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        placeholder="프로젝트 이름을 입력하세요"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">설명</Label>
                      <Input
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="프로젝트 설명을 입력하세요"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleCreateProject}>
                        생성
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
        
        {isCollapsed && (
          <div className="p-2 flex justify-center">
            <FolderOpen className="h-5 w-5" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>프로젝트 목록</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton 
                    onClick={() => onProjectSelect(project.id)}
                    isActive={selectedProject === project.id}
                    className={isCollapsed ? "justify-center" : "flex flex-col items-start h-auto p-3 hover:bg-accent"}
                    tooltip={isCollapsed ? project.name : undefined}
                  >
                    {isCollapsed ? (
                      <FolderOpen className="h-4 w-4" />
                    ) : (
                      <>
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-medium text-sm">{project.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-left line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {project.memberCount}명
                          </div>
                          <div>
                            {project.lastUpdated}
                          </div>
                        </div>
                      </>
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
      </SidebarContent>
    </Sidebar>
  );
};
