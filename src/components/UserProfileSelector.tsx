
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, User } from "lucide-react";
import { UserProfile, searchUserProfiles } from "@/utils/userSearchUtils";
import { getRoleText } from "@/utils/permissionUtils";

interface UserProfileSelectorProps {
  label: string;
  selectedProfile: UserProfile | null;
  onProfileSelect: (profile: UserProfile | null) => void;
}

export const UserProfileSelector = ({ label, selectedProfile, onProfileSelect }: UserProfileSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const results = searchUserProfiles(searchQuery);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleProfileSelect = (profile: UserProfile) => {
    onProfileSelect(profile);
    setShowResults(false);
    setSearchQuery("");
  };

  const clearSelection = () => {
    onProfileSelect(null);
    setSearchResults([]);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {selectedProfile ? (
        <div className="p-3 border rounded-md bg-secondary/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{selectedProfile.name}</p>
                <p className="text-xs text-muted-foreground">{selectedProfile.employeeId}</p>
                <p className="text-xs text-muted-foreground">{selectedProfile.email}</p>
                <p className="text-xs text-muted-foreground">{getRoleText(selectedProfile.role)}</p>
              </div>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={clearSelection}
            >
              변경
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="사번, 이름, 이메일로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSearch}
              className="px-3"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {showResults && (
            <div className="border rounded-md max-h-48 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="p-1">
                  {searchResults.map((profile) => (
                    <button
                      key={profile.employeeId}
                      type="button"
                      onClick={() => handleProfileSelect(profile)}
                      className="w-full p-2 text-left hover:bg-secondary/80 rounded-sm transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{profile.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {profile.employeeId} | {profile.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getRoleText(profile.role)} | {profile.defaultIdc}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
