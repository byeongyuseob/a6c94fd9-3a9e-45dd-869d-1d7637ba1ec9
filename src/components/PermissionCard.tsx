
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Permission } from "@/types/permission";
import { getRoleColor, getRoleText } from "@/utils/permissionUtils";

interface PermissionCardProps {
  permission: Permission;
  onUpdatePermission: (id: string, field: keyof Permission["permissions"], value: boolean) => void;
}

export const PermissionCard = ({ permission, onUpdatePermission }: PermissionCardProps) => {
  return (
    <Card>
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
              onCheckedChange={(checked) => onUpdatePermission(permission.id, "read", checked)}
            />
            <Label>읽기</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={permission.permissions.write}
              onCheckedChange={(checked) => onUpdatePermission(permission.id, "write", checked)}
            />
            <Label>쓰기</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={permission.permissions.delete}
              onCheckedChange={(checked) => onUpdatePermission(permission.id, "delete", checked)}
            />
            <Label>삭제</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={permission.permissions.manage}
              onCheckedChange={(checked) => onUpdatePermission(permission.id, "manage", checked)}
            />
            <Label>관리</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
