
import { Permission } from "@/types/permission";

export const getProjectPermissions = (projectId: string): Permission[] => {
  const mockData: { [key: string]: Permission[] } = {
    "1": [
      {
        id: "1",
        name: "김개발",
        email: "kim.dev@example.com",
        role: "developer",
        permissions: { read: true, write: true, delete: true, manage: true },
        lastActive: "2024-06-15",
      },
      {
        id: "2",
        name: "이슈퍼",
        email: "lee.super@example.com",
        role: "supermanager",
        permissions: { read: true, write: true, delete: true, manage: false },
        lastActive: "2024-06-14",
      },
      {
        id: "3",
        name: "박매니저",
        email: "park.manager@example.com",
        role: "manager",
        permissions: { read: true, write: true, delete: false, manage: false },
        lastActive: "2024-06-13",
      },
    ],
    "2": [
      {
        id: "4",
        name: "최개발",
        email: "choi.dev@example.com",
        role: "developer",
        permissions: { read: true, write: true, delete: true, manage: true },
        lastActive: "2024-06-15",
      },
      {
        id: "5",
        name: "정운영",
        email: "jung.operator@example.com",
        role: "operator",
        permissions: { read: true, write: false, delete: false, manage: false },
        lastActive: "2024-06-12",
      },
    ],
    "3": [
      {
        id: "6",
        name: "한슈퍼",
        email: "han.super@example.com",
        role: "supermanager",
        permissions: { read: true, write: true, delete: true, manage: false },
        lastActive: "2024-06-14",
      },
      {
        id: "7",
        name: "윤매니저",
        email: "yoon.manager@example.com",
        role: "manager",
        permissions: { read: true, write: true, delete: false, manage: false },
        lastActive: "2024-06-11",
      },
    ],
  };

  return mockData[projectId] || [];
};

export interface ProjectSettings {
  general: {
    name: string;
    description: string;
    visibility: "public" | "private" | "internal";
    allowComments: boolean;
    enableNotifications: boolean;
  };
  secrets: {
    apiKeys: { name: string; key: string; description: string }[];
    databaseUrl: string;
    webhookSecret: string;
    encryptionKey: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    securityAlerts: boolean;
  };
}

export const getProjectSettings = (projectId: string): ProjectSettings => {
  const mockSettings: { [key: string]: ProjectSettings } = {
    "1": {
      general: {
        name: "웹 애플리케이션",
        description: "메인 웹 애플리케이션 프로젝트",
        visibility: "private",
        allowComments: true,
        enableNotifications: true,
      },
      secrets: {
        apiKeys: [
          { name: "Google API", key: "AIzaSyD...", description: "Google Maps API 키" },
          { name: "Stripe API", key: "sk_test_...", description: "결제 처리용 Stripe API 키" },
        ],
        databaseUrl: "postgresql://user:pass@localhost:5432/webapp",
        webhookSecret: "whsec_1234567890abcdef",
        encryptionKey: "enc_key_webapp_secure_2024",
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        weeklyReports: true,
        securityAlerts: true,
      },
    },
    "2": {
      general: {
        name: "모바일 앱",
        description: "iOS/Android 모바일 애플리케이션",
        visibility: "internal",
        allowComments: true,
        enableNotifications: true,
      },
      secrets: {
        apiKeys: [
          { name: "Firebase API", key: "AIzaBC...", description: "Firebase 인증 및 푸시 알림" },
          { name: "OneSignal API", key: "os_api_...", description: "푸시 알림 서비스" },
        ],
        databaseUrl: "mongodb://user:pass@localhost:27017/mobileapp",
        webhookSecret: "whsec_mobile_hook_secret",
        encryptionKey: "enc_key_mobile_app_2024",
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: false,
        securityAlerts: true,
      },
    },
    "3": {
      general: {
        name: "API 서버",
        description: "백엔드 API 서버 프로젝트",
        visibility: "private",
        allowComments: false,
        enableNotifications: true,
      },
      secrets: {
        apiKeys: [
          { name: "AWS S3", key: "AKIA...", description: "파일 저장소 접근" },
          { name: "SendGrid API", key: "SG.123...", description: "이메일 발송 서비스" },
        ],
        databaseUrl: "postgresql://admin:pass@db-server:5432/api_db",
        webhookSecret: "whsec_api_server_webhook_2024",
        encryptionKey: "enc_key_api_server_ultra_secure",
      },
      notifications: {
        emailNotifications: false,
        pushNotifications: false,
        weeklyReports: true,
        securityAlerts: true,
      },
    },
  };

  return mockSettings[projectId] || mockSettings["1"];
};
