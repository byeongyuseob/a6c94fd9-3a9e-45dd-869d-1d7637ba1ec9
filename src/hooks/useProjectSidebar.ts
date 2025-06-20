
import { useState, useEffect, useCallback } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
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
          members: [],
        },
        {
          id: "2",
          name: "모바일 앱",
          description: "iOS/Android 모바일 애플리케이션",
          lastUpdated: "2024-06-14",
          memberCount: 8,
          members: [],
        },
        {
          id: "3",
          name: "API 서버",
          description: "백엔드 API 서버 프로젝트",
          lastUpdated: "2024-06-13",
          memberCount: 5,
          members: [],
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

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    addNotification({
      type: 'success',
      title: '프로젝트 수정됨',
      message: `${updatedProject.name} 프로젝트가 성공적으로 수정되었습니다.`,
    });
  }, [addNotification]);

  const handleDeleteProject = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    addNotification({
      type: 'success',
      title: '프로젝트 삭제됨',
      message: `${project?.name} 프로젝트가 성공적으로 삭제되었습니다.`,
    });
  }, [projects, addNotification]);

  return {
    isLoading,
    projects,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject,
  };
};
