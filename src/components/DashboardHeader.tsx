
import { FolderOpen } from "lucide-react";

interface DashboardHeaderProps {
  selectedProject: string | null;
}

export const DashboardHeader = ({ selectedProject }: DashboardHeaderProps) => (
  <div className="mb-2">
    <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-3">
      <div className="p-1.5 bg-primary/10 text-primary rounded-lg">
        <FolderOpen className="h-5 w-5" />
      </div>
      대시보드
    </h2>
    <p className="text-muted-foreground">
      {selectedProject
        ? "선택된 프로젝트의 권한과 설정을 관리하세요"
        : "시작하려면 왼쪽에서 프로젝트를 선택해주세요"
      }
    </p>
  </div>
);
