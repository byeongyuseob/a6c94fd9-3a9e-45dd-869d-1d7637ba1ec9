
import React, { useState } from "react";
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
import { Plus } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdated: string;
  memberCount: number;
}

interface ProjectCreateDialogProps {
  onCreateProject: (project: Project) => void;
}

export const ProjectCreateDialog = ({ onCreateProject }: ProjectCreateDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
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

    onCreateProject(project);
    setNewProject({ name: "", description: "" });
    setIsDialogOpen(false);
  };

  const errorMessage = !newProject.name.trim() && isDialogOpen ? "프로젝트 이름을 입력해주세요." : "";

  return (
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
  );
};
