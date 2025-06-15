
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, FolderOpen } from "lucide-react";

interface BreadcrumbNavProps {
  selectedProject: string | null;
  currentSection?: string;
}

export const BreadcrumbNav = ({ selectedProject, currentSection }: BreadcrumbNavProps) => {
  const projects = [
    { id: "1", name: "웹 애플리케이션" },
    { id: "2", name: "모바일 앱" },
    { id: "3", name: "API 서버" },
  ];

  const currentProject = projects.find(p => p.id === selectedProject);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1.5">
            <Home className="h-3.5 w-3.5" />
            홈
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {currentProject && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5">
                <FolderOpen className="h-3.5 w-3.5" />
                {currentProject.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {currentSection && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentSection}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
