
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { UserInput } from "@/components/UserInput";

interface Props {
  onCreate: (project: Project) => void;
}

export const ProjectSidebarCreateDialog = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    description: "",
    members: [] as User[]
  });
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
      memberCount: form.members.length,
      members: form.members,
    });
    
    setForm({ 
      name: "", 
      description: "",
      members: []
    });
    setOpen(false);
    toast({
      title: "성공",
      description: "새 프로젝트가 생성되었습니다.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
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
            </div>
          </SidebarMenuButton>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 프로젝트 생성</DialogTitle>
          <DialogDescription>
            새로운 프로젝트를 생성하고 팀원을 추가하세요.
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
