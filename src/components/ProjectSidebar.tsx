
import { useState, useEffect, useMemo, useCallback } from "react";
import { FolderOpen } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { ProjectSidebarProjectList } from "@/components/ProjectSidebarProjectList";
import { ProjectSidebarCreateDialog } from "@/components/ProjectSidebarCreateDialog";
import { AdvancedSearch, SearchFilters } from "@/components/AdvancedSearch";
import { SidebarSkeleton } from "@/components/LoadingStates";
import { Project } from "@/types/project";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useNotifications } from "@/contexts/NotificationContext";

interface ProjectSidebarProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

export const ProjectSidebar = ({
  onProjectSelect,
  selectedProject,
}: ProjectSidebarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: '',
    memberCount: '',
    dateRange: {},
    tags: [],
  });

  const { addNotification } = useNotifications();

  useEffect(() => {
    // 프로젝트 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "웹 애플리케이션",
          description: "메인 웹 애플리케이션 프로젝트",
          lastUpdated: "2024-06-15",
          memberCount: 12,
        },
        {
          id: "2",
          name: "모바일 앱",
          description: "iOS/Android 모바일 애플리케이션",
          lastUpdated: "2024-06-14",
          memberCount: 8,
        },
        {
          id: "3",
          name: "API 서버",
          description: "백엔드 API 서버 프로젝트",
          lastUpdated: "2024-06-13",
          memberCount: 5,
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // 검색어 필터
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery =
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // 상태 필터 (현재는 mock 데이터에 status가 없으므로 생략)

      // 멤버 수 필터
      if (filters.memberCount) {
        switch (filters.memberCount) {
          case '1-5':
            if (project.memberCount > 5) return false;
            break;
          case '6-10':
            if (project.memberCount < 6 || project.memberCount > 10) return false;
            break;
          case '11-20':
            if (project.memberCount < 11 || project.memberCount > 20) return false;
            break;
          case '20+':
            if (project.memberCount < 20) return false;
            break;
        }
      }

      // 날짜 범위 필터
      if (filters.dateRange.from || filters.dateRange.to) {
        const projectDate = new Date(project.lastUpdated);
        if (filters.dateRange.from && projectDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && projectDate > filters.dateRange.to) return false;
      }

      return true;
    });
  }, [projects, filters]);

  const handleCreateProject = useCallback((project: Project) => {
    setProjects(prev => [...prev, project]);
    addNotification({
      type: 'success',
      title: '프로젝트 생성됨',
      message: `${project.name} 프로젝트가 성공적으로 생성되었습니다.`,
    });
  }, [addNotification]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      query: '',
      status: '',
      memberCount: '',
      dateRange: {},
      tags: [],
    });
  }, []);

  // 키보드 단축키 및 ARIA 내비게이션 보강
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrlKey: true,
      callback: () => {
        // 새 프로젝트 생성 대화상자 열기 (추후 구현)
        // 알림만 뜨게 설정
        addNotification({
          type: 'info',
          title: '단축키 안내',
          message: '프로젝트 생성 버튼을 클릭해보세요.',
        });
      },
      description: '새 프로젝트 생성',
    },
    {
      key: '1',
      callback: () => projects[0] && onProjectSelect(projects[0].id),
      description: '첫 번째 프로젝트 선택',
    },
    {
      key: '2',
      callback: () => projects[1] && onProjectSelect(projects[1].id),
      description: '두 번째 프로젝트 선택',
    },
    {
      key: '3',
      callback: () => projects[2] && onProjectSelect(projects[2].id),
      description: '세 번째 프로젝트 선택',
    },
  ]);

  // 접근성: sidebar role, projectlist ARIA리스트, aria-expanded 등 분산 배치
  return (
    <Sidebar
      variant="inset"
      className="bg-background/95 backdrop-blur-sm border-r shadow-soft"
      aria-label="프로젝트 사이드바"
    >
      <SidebarHeader className="border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl shadow-soft">
              <FolderOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              프로젝트
            </span>
          </div>
          {!isLoading && projects.length > 0 && (
            <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
              {filteredProjects.length}/{projects.length}
            </div>
          )}
        </div>
        <div className="px-4 pb-4">
          <AdvancedSearch
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            aria-label="프로젝트 고급 검색"
          />
        </div>
        <div className="px-4 pb-4">
          <ProjectSidebarCreateDialog onCreate={handleCreateProject} />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/40" role="region" aria-label="프로젝트 리스트 컨테이너">
        {isLoading ? (
          <SidebarSkeleton />
        ) : (
          <ProjectSidebarProjectList
            projects={projects}
            filteredProjects={filteredProjects}
            selectedProject={selectedProject}
            isCollapsed={false}
            onProjectSelect={onProjectSelect}
            aria-label="프로젝트 리스트"
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
};
// 파일이 210줄로 매우 깁니다. 추가적인 기능이나 유지보수의 용이성을 위해 리팩토링을 권장합니다.
