
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, User } from "lucide-react";
import { User as UserType } from "@/types/user";

interface UserInputProps {
  label: string;
  users: UserType[];
  onUsersChange: (users: UserType[]) => void;
  role: 'operator' | 'developer';
}

export const UserInput = ({ label, users, onUsersChange, role }: UserInputProps) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const addUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      const user: UserType = {
        id: Date.now().toString(),
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: role
      };
      onUsersChange([...users, user]);
      setNewUser({ name: "", email: "" });
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
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
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
          <Input
            placeholder="이메일"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="text-sm"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addUser}
          disabled={!newUser.name.trim() || !newUser.email.trim()}
          className="w-full h-8 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          추가
        </Button>
      </div>
    </div>
  );
};
