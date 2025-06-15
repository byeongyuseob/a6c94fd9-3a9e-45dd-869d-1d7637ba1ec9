
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Permission } from "@/types/permission";
import { getRoleColor, getRoleText } from "@/utils/permissionUtils";
import { EditUserDialog } from "@/components/EditUserDialog";
import { useToast } from "@/hooks/use-toast";

interface PermissionCardProps {
  permissions: Permission[];
  onEditUser: (updatedPermission: Permission) => void;
  onDeleteUser: (permissionId: string) => void;
}

export const PermissionCard = ({ permissions, onEditUser, onDeleteUser }: PermissionCardProps) => {
  const { toast } = useToast();

  const handleDeleteUser = (permission: Permission) => {
    if (window.confirm(`${permission.name} 사용자를 정말 삭제하시겠습니까?`)) {
      onDeleteUser(permission.id);
      toast({
        title: "삭제됨",
        description: "사용자가 삭제되었습니다.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">사용자 권한 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사번</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>메일주소</TableHead>
              <TableHead>권한</TableHead>
              <TableHead>최종 활동</TableHead>
              <TableHead>작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">
                  {permission.employeeId}
                </TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(permission.role)}`}>
                    {getRoleText(permission.role)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {permission.lastActive}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditUserDialog permission={permission} onEditUser={onEditUser} />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteUser(permission)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
