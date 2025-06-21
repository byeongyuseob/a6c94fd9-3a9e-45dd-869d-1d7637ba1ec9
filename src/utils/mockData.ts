
import { Permission } from "@/types/permission";

export const getProjectPermissions = (projectId: string): Permission[] => {
  const mockData: { [key: string]: Permission[] } = {
    "1": [
      {
        id: "1",
        employeeId: "EMP001",
        name: "김정규직",
        email: "kim.regular@example.com",
        idc: ["춘천IDC운영", "가산IDC운영"],
        role: "regular",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-01",
        modifiedDate: "2024-06-15",
        lastActive: "2024-06-15",
      },
      {
        id: "2",
        employeeId: "EMP002",
        name: "이비정규",
        email: "lee.contract@example.com",
        idc: ["가산2IDC운영"],
        role: "contract",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-02",
        modifiedDate: "2024-06-14",
        lastActive: "2024-06-14",
      },
      {
        id: "3",
        employeeId: "EMP003",
        name: "박매니저",
        email: "park.manager@example.com",
        idc: ["평촌IDC운영", "평촌2IDC운영", "판교IDC운영"],
        role: "manager",
        permissions: { read: true, write: true, delete: false, manage: false },
        createdDate: "2024-06-03",
        modifiedDate: "2024-06-13",
        lastActive: "2024-06-13",
      },
      {
        id: "4",
        employeeId: "EMP004",
        name: "최슈퍼",
        email: "choi.super@example.com",
        idc: ["세종IDC운영"],
        role: "supermanager",
        permissions: { read: true, write: true, delete: true, manage: false },
        createdDate: "2024-06-04",
        modifiedDate: "2024-06-12",
        lastActive: "2024-06-12",
      },
      {
        id: "5",
        employeeId: "EMP005",
        name: "정개발",
        email: "jung.dev@example.com",
        idc: ["죽전IDC운영", "대전IDC운영", "부산IDC운영"],
        role: "developer",
        permissions: { read: true, write: true, delete: true, manage: true },
        createdDate: "2024-06-05",
        modifiedDate: "2024-06-12",
        lastActive: "2024-06-12",
      },
    ],
    "2": [
      {
        id: "11",
        employeeId: "EMP006",
        name: "한정규직",
        email: "han.regular@example.com",
        idc: ["가산3IDC운영"],
        role: "regular",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-06",
        modifiedDate: "2024-06-10",
        lastActive: "2024-06-10",
      },
      {
        id: "12",
        employeeId: "EMP007",
        name: "윤비정규",
        email: "yoon.contract@example.com",
        idc: ["춘천IDC운영", "평촌IDC운영"],
        role: "contract",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-07",
        modifiedDate: "2024-06-11",
        lastActive: "2024-06-11",
      },
      {
        id: "13",
        employeeId: "EMP008",
        name: "백매니저",
        email: "baek.manager@example.com",
        idc: ["가산IDC운영", "가산2IDC운영"],
        role: "manager",
        permissions: { read: true, write: true, delete: false, manage: false },
        createdDate: "2024-06-08",
        modifiedDate: "2024-06-11",
        lastActive: "2024-06-11",
      },
      {
        id: "14",
        employeeId: "EMP009",
        name: "서슈퍼",
        email: "seo.super@example.com",
        idc: ["판교IDC운영"],
        role: "supermanager",
        permissions: { read: true, write: true, delete: true, manage: false },
        createdDate: "2024-06-09",
        modifiedDate: "2024-06-09",
        lastActive: "2024-06-09",
      },
      {
        id: "15",
        employeeId: "EMP010",
        name: "오개발",
        email: "oh.dev@example.com",
        idc: ["세종IDC운영", "죽전IDC운영"],
        role: "developer",
        permissions: { read: true, write: true, delete: true, manage: true },
        createdDate: "2024-06-10",
        modifiedDate: "2024-06-09",
        lastActive: "2024-06-09",
      },
    ],
    "3": [
      {
        id: "16",
        employeeId: "EMP011",
        name: "최정규직",
        email: "choi.regular@example.com",
        idc: ["대전IDC운영"],
        role: "regular",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-11",
        modifiedDate: "2024-06-13",
        lastActive: "2024-06-13",
      },
      {
        id: "17",
        employeeId: "EMP012",
        name: "류비정규",
        email: "ryu.contract@example.com",
        idc: ["부산IDC운영", "춘천IDC운영"],
        role: "contract",
        permissions: { read: true, write: false, delete: false, manage: false },
        createdDate: "2024-06-12",
        modifiedDate: "2024-06-13",
        lastActive: "2024-06-13",
      },
      {
        id: "18",
        employeeId: "EMP013",
        name: "심매니저",
        email: "sim.manager@example.com",
        idc: ["평촌2IDC운영"],
        role: "manager",
        permissions: { read: true, write: true, delete: false, manage: false },
        createdDate: "2024-06-13",
        modifiedDate: "2024-06-14",
        lastActive: "2024-06-14",
      },
      {
        id: "19",
        employeeId: "EMP014",
        name: "허슈퍼",
        email: "hur.super@example.com",
        idc: ["가산3IDC운영", "판교IDC운영"],
        role: "supermanager",
        permissions: { read: true, write: true, delete: true, manage: false },
        createdDate: "2024-06-14",
        modifiedDate: "2024-06-14",
        lastActive: "2024-06-14",
      },
      {
        id: "20",
        employeeId: "EMP015",
        name: "정개발2",
        email: "jung2.dev@example.com",
        idc: ["세종IDC운영", "죽전IDC운영", "대전IDC운영"],
        role: "developer",
        permissions: { read: true, write: true, delete: true, manage: true },
        createdDate: "2024-06-15",
        modifiedDate: "2024-06-14",
        lastActive: "2024-06-14",
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
  docker: {
    apiUrl?: string;
    apiKey?: string;
    dbUrl?: string;
    dbId?: string;
    dbPassword?: string;
    environments?: {
      dev: {
        application: { APP_VERSION: string; DEBUG_MODE: string; LOG_LEVEL: string; };
        api: { API_URL: string; API_KEY: string; };
        database: { DB_HOST: string; DB_PORT: string; DB_NAME: string; DB_USERNAME: string; DB_PASSWORD: string; };
        custom: { [key: string]: string; };
      };
      staging: {
        application: { APP_VERSION: string; DEBUG_MODE: string; LOG_LEVEL: string; };
        api: { API_URL: string; API_KEY: string; };
        database: { DB_HOST: string; DB_PORT: string; DB_NAME: string; DB_USERNAME: string; DB_PASSWORD: string; };
        custom: { [key: string]: string; };
      };
      prod: {
        application: { APP_VERSION: string; DEBUG_MODE: string; LOG_LEVEL: string; };
        api: { API_URL: string; API_KEY: string; };
        database: { DB_HOST: string; DB_PORT: string; DB_NAME: string; DB_USERNAME: string; DB_PASSWORD: string; };
        custom: { [key: string]: string; };
      };
    };
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
      docker: {
        // Legacy fields for backward compatibility
        apiUrl: "http://localhost:8080/api",
        apiKey: "webapp_api_key_2024",
        dbUrl: "postgresql://localhost:5432/webapp",
        dbId: "webapp_user",
        dbPassword: "webapp_secure_pass",
        // New environment-specific configurations
        environments: {
          dev: {
            application: { APP_VERSION: '1.0.0-dev', DEBUG_MODE: 'true', LOG_LEVEL: 'debug' },
            api: { API_URL: 'http://localhost:8080/api', API_KEY: 'dev_webapp_key' },
            database: { DB_HOST: 'localhost', DB_PORT: '5432', DB_NAME: 'webapp_dev', DB_USERNAME: 'dev_user', DB_PASSWORD: 'dev_pass' },
            custom: { REDIS_URL: 'redis://localhost:6379', MAIL_SERVICE: 'development' }
          },
          staging: {
            application: { APP_VERSION: '1.0.0-rc', DEBUG_MODE: 'false', LOG_LEVEL: 'info' },
            api: { API_URL: 'https://staging-api.webapp.com/api', API_KEY: 'staging_webapp_key' },
            database: { DB_HOST: 'staging-db.webapp.com', DB_PORT: '5432', DB_NAME: 'webapp_staging', DB_USERNAME: 'staging_user', DB_PASSWORD: 'staging_pass' },
            custom: { REDIS_URL: 'redis://staging-redis.webapp.com:6379', MAIL_SERVICE: 'sendgrid' }
          },
          prod: {
            application: { APP_VERSION: '1.0.0', DEBUG_MODE: 'false', LOG_LEVEL: 'error' },
            api: { API_URL: 'https://api.webapp.com/api', API_KEY: 'prod_webapp_key' },
            database: { DB_HOST: 'prod-db.webapp.com', DB_PORT: '5432', DB_NAME: 'webapp_prod', DB_USERNAME: 'prod_user', DB_PASSWORD: 'prod_pass' },
            custom: { REDIS_URL: 'redis://prod-redis.webapp.com:6379', MAIL_SERVICE: 'sendgrid', CDN_URL: 'https://cdn.webapp.com' }
          }
        }
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
      docker: {
        apiUrl: "http://localhost:9090/api",
        apiKey: "mobile_api_key_2024",
        dbUrl: "mongodb://localhost:27017/mobileapp",
        dbId: "mobile_user",
        dbPassword: "mobile_secure_pass",
        environments: {
          dev: {
            application: { APP_VERSION: '2.0.0-dev', DEBUG_MODE: 'true', LOG_LEVEL: 'debug' },
            api: { API_URL: 'http://localhost:9090/api', API_KEY: 'dev_mobile_key' },
            database: { DB_HOST: 'localhost', DB_PORT: '27017', DB_NAME: 'mobileapp_dev', DB_USERNAME: 'dev_mobile', DB_PASSWORD: 'dev_mobile_pass' },
            custom: { PUSH_SERVICE: 'development', ANALYTICS_ENABLED: 'false' }
          },
          staging: {
            application: { APP_VERSION: '2.0.0-beta', DEBUG_MODE: 'false', LOG_LEVEL: 'info' },
            api: { API_URL: 'https://staging-mobile-api.com/api', API_KEY: 'staging_mobile_key' },
            database: { DB_HOST: 'staging-mongo.mobile.com', DB_PORT: '27017', DB_NAME: 'mobileapp_staging', DB_USERNAME: 'staging_mobile', DB_PASSWORD: 'staging_mobile_pass' },
            custom: { PUSH_SERVICE: 'firebase', ANALYTICS_ENABLED: 'true' }
          },
          prod: {
            application: { APP_VERSION: '2.0.0', DEBUG_MODE: 'false', LOG_LEVEL: 'error' },
            api: { API_URL: 'https://mobile-api.com/api', API_KEY: 'prod_mobile_key' },
            database: { DB_HOST: 'prod-mongo.mobile.com', DB_PORT: '27017', DB_NAME: 'mobileapp_prod', DB_USERNAME: 'prod_mobile', DB_PASSWORD: 'prod_mobile_pass' },
            custom: { PUSH_SERVICE: 'firebase', ANALYTICS_ENABLED: 'true', CRASH_REPORTING: 'enabled' }
          }
        }
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
      docker: {
        apiUrl: "http://localhost:3000/api",
        apiKey: "api_server_key_2024",
        dbUrl: "postgresql://localhost:5432/api_db",
        dbId: "api_admin",
        dbPassword: "api_ultra_secure_pass",
        environments: {
          dev: {
            application: { APP_VERSION: '3.0.0-dev', DEBUG_MODE: 'true', LOG_LEVEL: 'debug' },
            api: { API_URL: 'http://localhost:3000/api', API_KEY: 'dev_api_server_key' },
            database: { DB_HOST: 'localhost', DB_PORT: '5432', DB_NAME: 'api_dev', DB_USERNAME: 'dev_api', DB_PASSWORD: 'dev_api_pass' },
            custom: { JWT_SECRET: 'dev_jwt_secret_key', RATE_LIMIT: '100' }
          },
          staging: {
            application: { APP_VERSION: '3.0.0-rc', DEBUG_MODE: 'false', LOG_LEVEL: 'info' },
            api: { API_URL: 'https://staging-api-server.com/api', API_KEY: 'staging_api_server_key' },
            database: { DB_HOST: 'staging-postgres.api.com', DB_PORT: '5432', DB_NAME: 'api_staging', DB_USERNAME: 'staging_api', DB_PASSWORD: 'staging_api_pass' },
            custom: { JWT_SECRET: 'staging_jwt_secret_key', RATE_LIMIT: '500', CORS_ORIGIN: 'https://staging.example.com' }
          },
          prod: {
            application: { APP_VERSION: '3.0.0', DEBUG_MODE: 'false', LOG_LEVEL: 'error' },
            api: { API_URL: 'https://api-server.com/api', API_KEY: 'prod_api_server_key' },
            database: { DB_HOST: 'prod-postgres.api.com', DB_PORT: '5432', DB_NAME: 'api_prod', DB_USERNAME: 'prod_api', DB_PASSWORD: 'prod_api_pass' },
            custom: { JWT_SECRET: 'prod_jwt_secret_ultra_secure', RATE_LIMIT: '1000', CORS_ORIGIN: 'https://example.com', MONITORING_ENABLED: 'true' }
          }
        }
      },
    },
  };

  return mockSettings[projectId] || mockSettings["1"];
};
