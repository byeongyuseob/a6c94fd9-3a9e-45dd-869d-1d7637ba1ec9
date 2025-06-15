
import { Button } from "@/components/ui/button";
import { Trash2, Eye, EyeOff } from "lucide-react";

interface ApiKeyCardProps {
  apiKey: { name: string; key: string; description: string };
  index: number;
  isVisible: boolean;
  onToggleVisibility: (index: number) => void;
  onRemove: (index: number) => void;
}

export const ApiKeyCard = ({ 
  apiKey, 
  index, 
  isVisible, 
  onToggleVisibility, 
  onRemove 
}: ApiKeyCardProps) => {
  const maskKey = (key: string) => {
    if (key.length <= 8) return "*".repeat(key.length);
    return key.substring(0, 4) + "*".repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium">{apiKey.name}</h4>
        <p className="text-sm text-muted-foreground mb-2">{apiKey.description}</p>
        <div className="flex items-center gap-2">
          <code className="text-sm bg-muted p-1 rounded">
            {isVisible ? apiKey.key : maskKey(apiKey.key)}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisibility(index)}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
