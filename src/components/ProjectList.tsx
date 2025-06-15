
import { useState, useMemo, useCallback } from "react";
import { ProjectCard } from "./ProjectCard";
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
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdated: string;
  memberCount: number;
}

interface ProjectListProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

const ProjectListComponent = ({ onProjectSelect, selectedProject }: ProjectListProps) => {
  const { toast } = useToast();
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
      status: "active",
      lastUpdated: "2024-06-15",
      memberCount: 12,
    },
    {
      id: "2",
      name: "모바일 앱",
      description: "iOS/Android 모바일 애플리케이션",
      status: "active",
      lastUpdated: "2024-06-14",
      memberCount: 8,
    },
    {
      id: "3",
      name: "API 서버",
      description: "백엔드 API 서버 프로젝트",
      status: "maintenance",
      lastUpdated: "2024-06-13",
      memberCount: 5,
    },
  ]);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [projects, searchTerm]
  );

  const handleCreateProject = useCallback(() => {
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
      status: "active",
      lastUpdated: new Date().toISOString().split("T")[0],
      memberCount: 1,
    };

    setProjects((prev) => [...prev, project]);
    setNewProject({ name: "", description: "" });
    setIsDialogOpen(false);

    toast({
      title: "성공",
      description: "새 프로젝트가 생성되었습니다.",
    });
  }, [newProject, toast]);

  // 접근성: 에러 메시지, role, aria 속성, 키보드 내비게이션 추가
  const errorMessage = useMemo(() => {
    if (!newProject.name.trim() && isDialogOpen) {
      return "프로젝트 이름을 입력해주세요.";
    }
    return "";
  }, [newProject.name, isDialogOpen]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              aria-label="프로젝트 검색"
              placeholder="프로젝트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              role="searchbox"
            />
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button aria-label="새 프로젝트 생성 열기">
              <Plus className="h-4 w-4 mr-2" />
              새 프로젝트
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새 프로젝트 생성</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateProject();
              }}
              aria-label="새 프로젝트 생성 폼"
            >
              <div>
                <Label htmlFor="name">프로젝트 이름</Label>
                <Input
                  id="name"
                  required
                  aria-required="true"
                  aria-label="프로젝트 이름"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  placeholder="프로젝트 이름을 입력하세요"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="description">설명</Label>
                <Input
                  id="description"
                  aria-label="프로젝트 설명"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="프로젝트 설명을 입력하세요"
                />
              </div>
              {errorMessage && (
                <div
                  className="text-red-500 text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  {errorMessage}
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  aria-label="취소"
                >
                  취소
                </Button>
                <Button type="submit" aria-label="생성">
                  생성
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        role="list"
        aria-label="프로젝트 목록"
      >
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject === project.id}
            onSelect={() => onProjectSelect(project.id)}
            tabIndex={0}
            aria-selected={selectedProject === project.id}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12" role="status" aria-live="polite">
          <p className="text-muted-foreground">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export const ProjectList = React.memo(ProjectListComponent);
