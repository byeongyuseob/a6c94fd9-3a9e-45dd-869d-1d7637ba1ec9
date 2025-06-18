
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, User } from "lucide-react";
import { User as UserType } from "@/types/user";

interface UserInputProps {
  label: string;
  users: UserType[];
  onUsersChange: (users: UserType[]) => void;
}

const roleOptions = [
  { value: 'PM', label: 'PM (프로젝트 매니저)' },
  { value: 'ProductOwner', label: 'PO (프로덕트 오너)' },
  { value: 'FrontEnd', label: 'Frontend 개발자' },
  { value: 'BackEnd', label: 'Backend 개발자' },
  { value: 'Architect', label: '시스템 아키텍트' },
  { value: 'Designer', label: 'UI/UX 디자이너' },
  { value: 'DevOps', label: 'DevOps 엔지니어' },
  { value: 'Tester', label: '테스터' },
  { value: 'QA', label: 'QA 엔지니어' },
  { value: 'DataAnalyst', label: '데이터 분석가' },
  { value: 'Marketing', label: '마케팅' },
  { value: 'Sales', label: '영업' }
] as const;

export const UserInput = ({ label, users, onUsersChange }: UserInputProps) => {
  const [newUser, setNewUser] = useState({ name: "", role: "" as UserType['role'] | "" });

  const addUser = () => {
    if (newUser.name.trim() && newUser.role) {
      const user: UserType = {
        id: Date.now().toString(),
        name: newUser.name.trim(),
        role: newUser.role as UserType['role']
      };
      onUsersChange([...users, user]);
      setNewUser({ name: "", role: "" });
    }
  };

  const removeUser = (userId: string) => {
    onUsersChange(users.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* 기존 사용자 목록 */}
      {users.length > 0 && (
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-2 bg-secondary/50 rounded-md">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {roleOptions.find(option => option.value === user.role)?.label || user.role}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeUser(user.id)}
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 새 사용자 추가 */}
      <div className="space-y-2 p-3 border rounded-md bg-background/50">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="이름"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="text-sm"
          />
          <Select
            value={newUser.role}
            onValueChange={(value) => setNewUser({ ...newUser, role: value as UserType['role'] })}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="역할 선택" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addUser}
          disabled={!newUser.name.trim() || !newUser.role}
          className="w-full h-8 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          추가
        </Button>
      </div>
    </div>
  );
};
