
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
        <div className="w-full p-1 rounded-2xl bg-gradient-to-r from-secondary/30 via-secondary/20 to-secondary/30 hover:from-primary/5 hover:via-primary/10 hover:to-primary/5 transition-all duration-300 group">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full h-auto rounded-xl justify-start bg-background/80 hover:bg-background/90 border-0 p-4 group-hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  새 프로젝트
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                  프로젝트를 생성해보세요
                </span>
              </div>
            </div>
          </Button>
        </div>
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
