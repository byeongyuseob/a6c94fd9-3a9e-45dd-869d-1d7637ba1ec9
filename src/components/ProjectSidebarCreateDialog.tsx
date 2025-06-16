
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

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
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpen(true)}
            className="h-auto items-start rounded-xl p-4 border transition-all duration-300 hover:shadow-soft group animate-in hover:bg-accent/50 hover:text-accent-foreground bg-background/60 border-border/50 hover:border-border hover:shadow-soft"
          >
            <div className="p-2.5 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-105 bg-secondary/80 group-hover:bg-secondary">
              <Plus className="h-4 w-4 transition-all duration-300 text-secondary-foreground group-hover:text-foreground" />
            </div>
            
            <div className="flex flex-col items-start min-w-0 flex-1 ml-3">
              <span className="font-semibold text-sm truncate w-full transition-colors duration-300 text-foreground group-hover:text-foreground">
                새 프로젝트
              </span>
              
              <p className="text-xs mt-1.5 line-clamp-2 transition-colors duration-300 text-muted-foreground group-hover:text-foreground/80">
                새로운 프로젝트를 생성하세요
              </p>
              
              <div className="flex items-center gap-4 text-xs mt-3 transition-colors duration-300 text-muted-foreground group-hover:text-foreground/70">
                <div className="flex items-center gap-1.5">
                  <Plus className="h-3 w-3" />
                  <span className="font-medium">생성</span>
                </div>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
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
