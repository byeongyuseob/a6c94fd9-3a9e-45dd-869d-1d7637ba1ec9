
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Building } from "lucide-react";
import { IDC_OPTIONS } from "@/types/permission";

interface IdcSelectorProps {
  label: string;
  selectedIdcs: string[];
  onIdcsChange: (idcs: string[]) => void;
}

export const IdcSelector = ({ label, selectedIdcs, onIdcsChange }: IdcSelectorProps) => {
  const [newIdc, setNewIdc] = useState("");

  const addIdc = () => {
    if (newIdc && !selectedIdcs.includes(newIdc)) {
      onIdcsChange([...selectedIdcs, newIdc]);
      setNewIdc("");
    }
  };

  const removeIdc = (idcToRemove: string) => {
    if (selectedIdcs.length > 1) { // Ensure at least one IDC remains
      onIdcsChange(selectedIdcs.filter(idc => idc !== idcToRemove));
    }
  };

  const availableIdcs = IDC_OPTIONS.filter(idc => !selectedIdcs.includes(idc));

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* 선택된 IDC 목록 */}
      {selectedIdcs.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {selectedIdcs.map((idc) => (
            <div key={idc} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{idc}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeIdc(idc)}
                disabled={selectedIdcs.length === 1}
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 새 IDC 추가 */}
      {availableIdcs.length > 0 && (
        <div className="space-y-2 p-3 border rounded-md bg-background/50">
          <div className="flex gap-2">
            <Select
              value={newIdc}
              onValueChange={setNewIdc}
            >
              <SelectTrigger className="text-sm flex-1">
                <SelectValue placeholder="IDC 선택" />
              </SelectTrigger>
              <SelectContent>
                {availableIdcs.map((idc) => (
                  <SelectItem key={idc} value={idc}>
                    {idc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIdc}
              disabled={!newIdc}
              className="h-10 px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
