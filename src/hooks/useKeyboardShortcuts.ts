
import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // input, textarea, contenteditable 요소에서는 단축키 비활성화
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return;
    }

    const matchingShortcut = shortcuts.find(shortcut => {
      return (
        shortcut.key.toLowerCase() === event.key.toLowerCase() &&
        (shortcut.ctrlKey ?? false) === event.ctrlKey &&
        (shortcut.altKey ?? false) === event.altKey &&
        (shortcut.shiftKey ?? false) === event.shiftKey &&
        (shortcut.metaKey ?? false) === event.metaKey
      );
    });

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.callback();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return shortcuts;
};

// 키보드 단축키 도움말 표시 훅
export const useShortcutHelp = () => {
  const shortcuts = [
    { key: '/', description: '검색에 포커스' },
    { key: 'n', ctrlKey: true, description: '새 프로젝트 생성' },
    { key: 'k', ctrlKey: true, description: '명령 팔레트 열기' },
    { key: '?', description: '단축키 도움말 표시' },
    { key: 'Escape', description: '대화상자 닫기' },
    { key: '1-9', description: '사이드바 프로젝트 선택' },
    { key: 'Tab', description: '탭 간 이동' },
  ];

  return shortcuts;
};
