
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { getDefaultPermissions } from "@/utils/permissionUtils";
import { IdcSelector } from "@/components/IdcSelector";
import { UserProfileSelector } from "@/components/UserProfileSelector";
import { UserProfile } from "@/utils/userSearchUtils";

interface EditUserDialogProps {
  permission: Permission;
  onEditUser: (updatedPermission: Permission) => void;
}

export const EditUserDialog = ({ permission, onEditUser }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // 기존 사용자 정보를 프로필 형태로 변환
  const initialProfile: UserProfile = {
    employeeId: permission.employeeId,
    name: permission.name,
    email: permission.email,
    role: permission.role,
    defaultIdc: permission.idc[0] || ""
  };
  
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(initialProfile);
  const [selectedRole, setSelectedRole] = useState(permission.role);
  const [selectedIdcs, setSelectedIdcs] = useState(permission.idc);

  const handleProfileSelect = (profile: UserProfile | null) => {
    setSelectedProfile(profile);
    if (profile) {
      setSelectedRole(profile.role);
      // 매니저, 슈퍼매니저, 개발자는 모든 IDC에 권한 부여
      const allIdcs = ["manager", "supermanager", "developer"].includes(profile.role) 
        ? [...IDC_OPTIONS] 
        : [profile.defaultIdc];
      setSelectedIdcs(allIdcs);
    }
  };

  const handleRoleChange = (role: "regular" | "contract" | "manager" | "supermanager" | "developer") => {
    setSelectedRole(role);
    // 매니저, 슈퍼매니저, 개발자는 모든 IDC에 권한 부여
    const allIdcs = ["manager", "supermanager", "developer"].includes(role) 
      ? [...IDC_OPTIONS] 
      : selectedIdcs;
    setSelectedIdcs(allIdcs);
  };

  const handleEditUser = () => {
    if (!selectedProfile || selectedIdcs.length === 0) {
      toast({
        title: "오류",
        description: "사용자 프로필과 IDC를 모두 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    const updatedPermission: Permission = {
      ...permission,
      employeeId: selectedProfile.employeeId,
      name: selectedProfile.name,
      email: selectedProfile.email,
      idc: selectedIdcs,
      role: selectedRole,
      permissions: getDefaultPermissions(selectedRole),
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
          <UserProfileSelector
            label="사용자 프로필"
            selectedProfile={selectedProfile}
            onProfileSelect={handleProfileSelect}
          />
          
          <div>
            <label className="text-sm font-medium">역할</label>
            <Select
              value={selectedRole}
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
            selectedIdcs={selectedIdcs}
            onIdcsChange={setSelectedIdcs}
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
