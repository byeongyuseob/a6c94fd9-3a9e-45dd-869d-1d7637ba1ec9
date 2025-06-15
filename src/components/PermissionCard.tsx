
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Permission } from "@/types/permission";
import { getRoleColor, getRoleText } from "@/utils/permissionUtils";

interface PermissionCardProps {
  permissions: Permission[];
}

export const PermissionCard = ({ permissions }: PermissionCardProps) => {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
