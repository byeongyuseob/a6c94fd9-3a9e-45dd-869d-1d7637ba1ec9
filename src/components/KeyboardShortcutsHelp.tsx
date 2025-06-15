
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Keyboard, Command } from 'lucide-react';
import { useShortcutHelp } from '@/hooks/useKeyboardShortcuts';

export const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shortcuts = useShortcutHelp();

  const formatShortcut = (shortcut: any) => {
    const keys = [];
    
    if (shortcut.ctrlKey || shortcut.metaKey) {
      keys.push(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl');
    }
    if (shortcut.altKey) {
      keys.push('Alt');
    }
    if (shortcut.shiftKey) {
      keys.push('Shift');
    }
    
    keys.push(shortcut.key === ' ' ? 'Space' : shortcut.key);
    
    return keys;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Keyboard className="h-4 w-4" />
          <span className="sr-only">키보드 단축키</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Command className="h-5 w-5" />
            키보드 단축키
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid gap-3">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
                <div className="flex gap-1">
                  {formatShortcut(shortcut).map((key, keyIndex) => (
                    <Badge 
                      key={keyIndex} 
                      variant="outline" 
                      className="px-2 py-1 text-xs font-mono bg-background border-border/50"
                    >
                      {key}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              입력 필드에서는 단축키가 비활성화됩니다
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
