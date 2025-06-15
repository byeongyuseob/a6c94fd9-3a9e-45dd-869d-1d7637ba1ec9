
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddApiKeyDialogProps {
  onAddApiKey: (apiKey: { name: string; key: string; description: string }) => void;
}

export const AddApiKeyDialog = ({ onAddApiKey }: AddApiKeyDialogProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState({ name: "", key: "", description: "" });

  const handleAdd = () => {
    if (!newApiKey.name.trim() || !newApiKey.key.trim()) {
      toast({
        title: "오류",
        description: "API 키 이름과 키를 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    onAddApiKey(newApiKey);
    setNewApiKey({ name: "", key: "", description: "" });
    setIsOpen(false);
    
    toast({
      title: "성공",
      description: "새 API 키가 추가되었습니다.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          API 키 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 API 키 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="api-name">API 이름</Label>
            <Input
              id="api-name"
              value={newApiKey.name}
              onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
              placeholder="예: Google Maps API"
            />
          </div>
          <div>
            <Label htmlFor="api-key">API 키</Label>
            <Input
              id="api-key"
              type="password"
              value={newApiKey.key}
              onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
              placeholder="API 키를 입력하세요"
            />
          </div>
          <div>
            <Label htmlFor="api-description">설명</Label>
            <Input
              id="api-description"
              value={newApiKey.description}
              onChange={(e) => setNewApiKey({ ...newApiKey, description: e.target.value })}
              placeholder="API 키 사용 목적"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAdd}>
              추가
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
