
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NewUser, Permission } from "@/types/permission";
import { getDefaultPermissions } from "@/utils/permissionUtils";

interface AddUserDialogProps {
  onAddUser: (permission: Permission) => void;
}

export const AddUserDialog = ({ onAddUser }: AddUserDialogProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    role: "operator",
  });

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "오류",
        description: "이름과 이메일을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const permission: Permission = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      permissions: getDefaultPermissions(newUser.role),
      lastActive: new Date().toISOString().split('T')[0],
    };

    onAddUser(permission);
    setNewUser({ name: "", email: "", role: "operator" });
    setIsDialogOpen(false);
    
    toast({
      title: "성공",
      description: "새 사용자가 추가되었습니다.",
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          사용자 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 사용자 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="사용자 이름"
            />
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <Label htmlFor="role">역할</Label>
            <Select value={newUser.role} onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operator">운영자</SelectItem>
                <SelectItem value="manager">매니저</SelectItem>
                <SelectItem value="supermanager">슈퍼매니저</SelectItem>
                <SelectItem value="developer">개발자</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddUser}>
              추가
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
