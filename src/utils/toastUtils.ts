
import { toast as sonnerToast } from "sonner"
import { toast as shadcnToast } from "@/hooks/use-toast"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(options?.title || "성공", {
      description: message,
      duration: options?.duration || 4000,
    })
  },
  
  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(options?.title || "오류", {
      description: message,
      duration: options?.duration || 4000,
    })
  },
  
  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(options?.title || "경고", {
      description: message,
      duration: options?.duration || 4000,
    })
  },
  
  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(options?.title || "정보", {
      description: message,
      duration: options?.duration || 4000,
    })
  },
  
  // shadcn/ui toast를 사용하는 경우
  shadcn: {
    success: (title: string, description?: string) => {
      shadcnToast({
        title,
        description,
        variant: "success" as any,
      })
    },
    
    error: (title: string, description?: string) => {
      shadcnToast({
        title,
        description,
        variant: "destructive",
      })
    },
    
    default: (title: string, description?: string) => {
      shadcnToast({
        title,
        description,
      })
    },
  }
}
