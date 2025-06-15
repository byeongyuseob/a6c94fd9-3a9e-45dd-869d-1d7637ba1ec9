
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";

interface Props {
  onCreate: (project: Project) => void;
}

export const ProjectSidebarCreateDialog = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const { toast } = useToast();

  const handleCreate = () => {
    if (!form.name.trim()) {
      toast({
        title: "오류",
        description: "프로젝트 이름을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    onCreate({
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      lastUpdated: new Date().toISOString().split('T')[0],
      memberCount: 1,
    });
    setForm({ name: "", description: "" });
    setOpen(false);
    toast({
      title: "성공",
      description: "새 프로젝트가 생성되었습니다.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full rounded-lg justify-start text-muted-foreground font-normal border-dashed hover:text-accent-foreground hover:border-solid">
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="프로젝트 이름을 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="프로젝트 설명을 입력하세요"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate}>
              생성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
