
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdated: string;
  memberCount: number;
}

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProjectCard = ({ project, isSelected, onSelect }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "활성";
      case "inactive":
        return "비활성";
      case "maintenance":
        return "점검중";
      default:
        return "알 수 없음";
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-primary shadow-md bg-primary/95" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle
            className={`text-lg font-semibold transition-colors ${
              isSelected ? "text-white" : "text-foreground"
            }`}
          >
            {project.name}
          </CardTitle>
          <Badge className={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>
        <p
          className={`text-sm mt-2 transition-colors ${
            isSelected ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`flex justify-between items-center text-sm transition-colors ${
          isSelected ? "text-white/80" : "text-muted-foreground"
        }`}>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {project.memberCount}명
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {project.lastUpdated}
          </div>
        </div>
        {isSelected && (
          <Button className="w-full mt-4 text-base-foreground bg-white/90 text-primary hover:bg-white">
            선택됨
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

