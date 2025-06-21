
import React from "react";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectCreateDialog } from "./ProjectCreateDialog";
import { ProjectGrid } from "./ProjectGrid";
import { useProjectList } from "@/hooks/useProjectList";

interface ProjectListProps {
  onProjectSelect: (projectId: string) => void;
  selectedProject: string | null;
}

const ProjectListComponent = ({ onProjectSelect, selectedProject }: ProjectListProps) => {
  const {
    searchTerm,
    setSearchTerm,
    filteredProjects,
    handleCreateProject,
  } = useProjectList();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <ProjectSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
        <ProjectCreateDialog onCreateProject={handleCreateProject} />
      </div>

      <ProjectGrid
        projects={filteredProjects}
        selectedProject={selectedProject}
        onProjectSelect={onProjectSelect}
      />
    </div>
  );
};

export const ProjectList = React.memo(ProjectListComponent);
