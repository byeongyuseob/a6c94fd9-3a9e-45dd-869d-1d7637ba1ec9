
import { Users } from "lucide-react";

export const PermissionEmptyState = () => {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">
        권한을 관리할 프로젝트를 선택해주세요
      </p>
    </div>
  );
};
