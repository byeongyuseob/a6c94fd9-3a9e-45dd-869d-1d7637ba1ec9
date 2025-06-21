
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
import { UserPlus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NewUser, Permission, IDC_OPTIONS } from "@/types/permission";
import { getDefaultPermissions } from "@/utils/permissionUtils";
import { IdcSelector } from "@/components/IdcSelector";
import { searchEmployeeByEmployeeId } from "@/utils/userSearchUtils";

interface AddUserDialogProps {
  onAddUser: (permission: Permission) => void;
}

export const AddUserDialog = ({ onAddUser }: AddUserDialogProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    employeeId: "",
    name: "",
    email: "",
    role: "regular",
    idc: [],
  });

  const handleSearchEmployee = () => {
    if (!newUser.employeeId.trim()) {
      toast({
        title: "오류",
        description: "사번을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const employeeData = searchEmployeeByEmployeeId(newUser.employeeId);
    if (employeeData) {
      // 매니저, 슈퍼매니저, 개발자는 모든 IDC에 권한 부여
      const allIdcs = ["manager", "supermanager", "developer"].includes(employeeData.role) 
        ? [...IDC_OPTIONS] 
        : [employeeData.defaultIdc];

      setNewUser({
        ...newUser,
        name: employeeData.name,
        email: employeeData.email,
        role: employeeData.role,
        idc: allIdcs,
      });

      toast({
        title: "성공",
        description: "사용자 정보를 찾았습니다.",
      });
    } else {
      toast({
        title: "오류",
        description: "해당 사번의 사용자를 찾을 수 없습니다.",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = (role: "regular" | "contract" | "manager" | "supermanager" | "developer") => {
    // 매니저, 슈퍼매니저, 개발자는 모든 IDC에 권한 부여
    const allIdcs = ["manager", "supermanager", "developer"].includes(role) 
      ? [...IDC_OPTIONS] 
      : newUser.idc.length > 0 ? newUser.idc : [];

    setNewUser({ 
      ...newUser, 
      role,
      idc: allIdcs
    });
  };

  const handleAddUser = () => {
    if (!newUser.employeeId.trim() || !newUser.name.trim() || !newUser.email.trim() || newUser.idc.length === 0) {
      toast({
        title: "오류",
        description: "사번, 이름, 이메일, IDC를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const permission: Permission = {
      id: Date.now().toString(),
      employeeId: newUser.employeeId,
      name: newUser.name,
      email: newUser.email,
      idc: newUser.idc,
      role: newUser.role,
      permissions: getDefaultPermissions(newUser.role),
      createdDate: currentDate,
      modifiedDate: currentDate,
      lastActive: currentDate,
    };

    onAddUser(permission);
    setNewUser({ employeeId: "", name: "", email: "", role: "regular", idc: [] });
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>새 사용자 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="employeeId">사번</Label>
            <div className="flex gap-2">
              <Input
                id="employeeId"
                value={newUser.employeeId}
                onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                placeholder="EMP001"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSearchEmployee}
                className="px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
              <Select
                value={newUser.role}
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
            selectedIdcs={newUser.idc}
            onIdcsChange={(idcs) => setNewUser({ ...newUser, idc: idcs })}
          />
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
