
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { UserInput } from "@/components/UserInput";

interface Props {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (project: Project) => void;
}

export const ProjectSidebarEditDialog = ({ project, open, onOpenChange, onUpdate }: Props) => {
  const [form, setForm] = useState({ 
    name: project.name, 
    description: project.description,
    members: project.members
  });
  const { toast } = useToast();

  const handleUpdate = () => {
    if (!form.name.trim()) {
      toast({
        title: "오류",
        description: "프로젝트 이름을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    onUpdate({
      ...project,
      name: form.name,
      description: form.description,
      members: form.members,
      memberCount: form.members.length,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    
    onOpenChange(false);
    toast({
      title: "성공",
      description: "프로젝트가 수정되었습니다.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로젝트 수정</DialogTitle>
          <DialogDescription>
            프로젝트 정보를 수정하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name">프로젝트 이름 *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="프로젝트 이름을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="description">프로젝트 설명</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="프로젝트 설명을 입력하세요"
                className="min-h-[80px]"
              />
            </div>
          </div>

          <UserInput
            label="팀원"
            users={form.members}
            onUsersChange={(members) => setForm({ ...form, members })}
          />

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button onClick={handleUpdate}>
              수정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
