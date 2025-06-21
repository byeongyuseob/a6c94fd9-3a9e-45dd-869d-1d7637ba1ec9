
import React from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdated: string;
  memberCount: number;
}

interface ProjectGridProps {
  projects: Project[];
  selectedProject: string | null;
  onProjectSelect: (projectId: string) => void;
}

export const ProjectGrid = ({ projects, selectedProject, onProjectSelect }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <p className="text-muted-foreground">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      role="list"
      aria-label="프로젝트 목록"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={selectedProject === project.id}
          onSelect={() => onProjectSelect(project.id)}
          aria-selected={selectedProject === project.id}
        />
      ))}
    </div>
  );
};
