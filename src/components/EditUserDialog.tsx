
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
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Permission, IDC_OPTIONS } from "@/types/permission";
import { getDefaultPermissions, getRoleText } from "@/utils/permissionUtils";
import { IdcSelector } from "@/components/IdcSelector";

interface EditUserDialogProps {
  permission: Permission;
  onEditUser: (updatedPermission: Permission) => void;
}

export const EditUserDialog = ({ permission, onEditUser }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    employeeId: permission.employeeId,
    name: permission.name,
    email: permission.email,
    idc: permission.idc,
    role: permission.role,
  });

  const handleRoleChange = (role: "regular" | "contract" | "manager" | "supermanager" | "developer") => {
    // 매니저, 슈퍼매니저, 개발자는 모든 IDC에 권한 부여
    const allIdcs = ["manager", "supermanager", "developer"].includes(role) 
      ? [...IDC_OPTIONS] 
      : editedUser.idc;

    setEditedUser({ 
      ...editedUser, 
      role,
      idc: allIdcs
    });
  };

  const handleEditUser = () => {
    if (!editedUser.employeeId.trim() || !editedUser.name.trim() || !editedUser.email.trim() || editedUser.idc.length === 0) {
      toast({
        title: "오류",
        description: "사번, 이름, 이메일, IDC를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const updatedPermission: Permission = {
      ...permission,
      employeeId: editedUser.employeeId,
      name: editedUser.name,
      email: editedUser.email,
      idc: editedUser.idc,
      role: editedUser.role,
      permissions: getDefaultPermissions(editedUser.role),
      modifiedDate: new Date().toISOString().split('T')[0],
    };

    onEditUser(updatedPermission);
    setIsDialogOpen(false);

    toast({
      title: "성공",
      description: "사용자 정보가 수정되었습니다.",
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>사용자 정보 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-employeeId">사번</Label>
            <Input
              id="edit-employeeId"
              value={editedUser.employeeId}
              onChange={(e) => setEditedUser({ ...editedUser, employeeId: e.target.value })}
              placeholder="EMP001"
            />
          </div>
          <div>
            <Label htmlFor="edit-name">이름</Label>
            <Input
              id="edit-name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              placeholder="사용자 이름"
            />
          </div>
          <div>
            <Label htmlFor="edit-email">이메일</Label>
            <Input
              id="edit-email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <Label htmlFor="edit-role">역할</Label>
            <Select
              value={editedUser.role}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger aria-label="역할 선택">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="supermanager">Supermanager</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <IdcSelector
            label="IDC"
            selectedIdcs={editedUser.idc}
            onIdcsChange={(idcs) => setEditedUser({ ...editedUser, idc: idcs })}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditUser}>
              수정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
