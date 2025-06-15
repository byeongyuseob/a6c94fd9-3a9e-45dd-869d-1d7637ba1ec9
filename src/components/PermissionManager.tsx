import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { UserPlus, Settings, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manage: boolean;
  };
  lastActive: string;
}

interface PermissionManagerProps {
  selectedProject: string | null;
}

export const PermissionManager = ({ selectedProject }: PermissionManagerProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: "owner" | "admin" | "member" | "viewer";
  }>({
    name: "",
    email: "",
    role: "member",
  });

  // 샘플 권한 데이터
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "김철수",
      email: "kim@example.com",
      role: "owner",
      permissions: { read: true, write: true, delete: true, manage: true },
      lastActive: "2024-06-15",
    },
    {
      id: "2",
      name: "이영희",
      email: "lee@example.com",
      role: "admin",
      permissions: { read: true, write: true, delete: true, manage: false },
      lastActive: "2024-06-14",
    },
    {
      id: "3",
      name: "박민수",
      email: "park@example.com",
      role: "member",
      permissions: { read: true, write: true, delete: false, manage: false },
      lastActive: "2024-06-13",
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "member":
        return "bg-green-100 text-green-800";
      case "viewer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "owner":
        return "소유자";
      case "admin":
        return "관리자";
      case "member":
        return "멤버";
      case "viewer":
        return "뷰어";
      default:
        return "알 수 없음";
    }
  };

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "오류",
        description: "이름과 이메일을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const defaultPermissions = {
      read: true,
      write: newUser.role !== "viewer",
      delete: newUser.role === "admin" || newUser.role === "owner",
      manage: newUser.role === "owner",
    };

    const permission: Permission = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      permissions: defaultPermissions,
      lastActive: new Date().toISOString().split('T')[0],
    };

    setPermissions([...permissions, permission]);
    setNewUser({ name: "", email: "", role: "member" });
    setIsDialogOpen(false);
    
    toast({
      title: "성공",
      description: "새 사용자가 추가되었습니다.",
    });
  };

  const updatePermission = (id: string, field: keyof Permission["permissions"], value: boolean) => {
    setPermissions(permissions.map(p => 
      p.id === id 
        ? { ...p, permissions: { ...p.permissions, [field]: value } }
        : p
    ));
  };

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          권한을 관리할 프로젝트를 선택해주세요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">권한 관리</h2>
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
                    <SelectItem value="viewer">뷰어</SelectItem>
                    <SelectItem value="member">멤버</SelectItem>
                    <SelectItem value="admin">관리자</SelectItem>
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
      </div>

      <div className="grid gap-4">
        {permissions.map((permission) => (
          <Card key={permission.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">{permission.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{permission.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(permission.role)}`}>
                    {getRoleText(permission.role)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {permission.lastActive}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={permission.permissions.read}
                    onCheckedChange={(checked) => updatePermission(permission.id, "read", checked)}
                  />
                  <Label>읽기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={permission.permissions.write}
                    onCheckedChange={(checked) => updatePermission(permission.id, "write", checked)}
                  />
                  <Label>쓰기</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={permission.permissions.delete}
                    onCheckedChange={(checked) => updatePermission(permission.id, "delete", checked)}
                  />
                  <Label>삭제</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={permission.permissions.manage}
                    onCheckedChange={(checked) => updatePermission(permission.id, "manage", checked)}
                  />
                  <Label>관리</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
