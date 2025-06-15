
import { useState, useEffect, useCallback } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Project } from "@/types/project";

interface UseProjectSidebarProps {
  onProjectSelect: (projectId: string) => void;
}

export const useProjectSidebar = ({ onProjectSelect }: UseProjectSidebarProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
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

  const handleCreateProject = useCallback((project: Project) => {
    setProjects(prev => [...prev, project]);
    addNotification({
      type: 'success',
      title: '프로젝트 생성됨',
      message: `${project.name} 프로젝트가 성공적으로 생성되었습니다.`,
    });
  }, [addNotification]);

  useKeyboardShortcuts([
    {
      key: 'n',
      ctrlKey: true,
      callback: () => {
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

  return {
    isLoading,
    projects,
    handleCreateProject,
  };
};
