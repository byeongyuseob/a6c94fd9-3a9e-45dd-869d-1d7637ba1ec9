
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ProjectSearch = ({ searchTerm, onSearchChange }: ProjectSearchProps) => {
  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        aria-label="프로젝트 검색"
        placeholder="프로젝트 검색..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
        role="searchbox"
      />
    </div>
  );
};
