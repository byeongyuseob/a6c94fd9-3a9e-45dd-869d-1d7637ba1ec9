
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Users } from "lucide-react";
import { PermissionManager } from "@/components/PermissionManager";
import { SettingsManager } from "@/components/SettingsManager";
import { TabContentSkeleton } from "@/components/LoadingStates";
import { useState } from "react";

interface ProjectTabPanelProps {
  selectedProject: string;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setCurrentSection: (sec: string) => void;
}

export const ProjectTabPanel = ({
  selectedProject,
  currentTab,
  setCurrentTab,
  setCurrentSection,
}: ProjectTabPanelProps) => {
  const [tabLoading, setTabLoading] = useState(false);

  const handleTabChange = (value: string) => {
    setTabLoading(true);
    setCurrentTab(value);
    setCurrentSection(value === "permissions" ? "권한 관리" : "설정 관리");
    setTimeout(() => setTabLoading(false), 500);
  };

  return (
    <div className="bg-background/60 backdrop-blur-sm rounded-xl border shadow-soft animate-in">
      <Tabs
        value={currentTab}
        className="w-full"
        onValueChange={handleTabChange}
        role="tablist"
        aria-label="관리 탭"
      >
        <div className="border-b px-6 py-4 bg-background/40 rounded-t-xl">
          <TabsList className="bg-secondary/50 backdrop-blur-sm" aria-label="관리 탭 리스트">
            <TabsTrigger
              value="permissions"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
              aria-label="권한 관리 탭"
              aria-selected={currentTab === "permissions"}
              tabIndex={0}
              role="tab"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">권한 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-soft"
              aria-label="설정 관리 탭"
              aria-selected={currentTab === "settings"}
              tabIndex={0}
              role="tab"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">설정 관리</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="permissions"
          className="p-4 md:p-6 m-0 animate-in"
          role="tabpanel"
          aria-labelledby="권한 관리 탭"
        >
          {tabLoading ? (
            <TabContentSkeleton />
          ) : (
            <PermissionManager selectedProject={selectedProject} />
          )}
        </TabsContent>

        <TabsContent
          value="settings"
          className="p-4 md:p-6 m-0 animate-in"
          role="tabpanel"
          aria-labelledby="설정 관리 탭"
        >
          {tabLoading ? (
            <TabContentSkeleton />
          ) : (
            <SettingsManager selectedProject={selectedProject} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
