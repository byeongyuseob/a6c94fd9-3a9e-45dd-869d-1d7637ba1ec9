
// Mock data for employee information
const mockEmployeeData = {
  "EMP001": {
    name: "김정규직",
    email: "kim.regular@example.com",
    role: "regular" as const,
    defaultIdc: "춘천IDC운영"
  },
  "EMP002": {
    name: "이비정규",
    email: "lee.contract@example.com",
    role: "contract" as const,
    defaultIdc: "가산IDC운영"
  },
  "EMP003": {
    name: "박매니저",
    email: "park.manager@example.com",
    role: "manager" as const,
    defaultIdc: "평촌IDC운영"
  },
  "EMP004": {
    name: "최슈퍼",
    email: "choi.super@example.com",
    role: "supermanager" as const,
    defaultIdc: "세종IDC운영"
  },
  "EMP005": {
    name: "정개발",
    email: "jung.dev@example.com",
    role: "developer" as const,
    defaultIdc: "죽전IDC운영"
  },
  "EMP006": {
    name: "한정규직",
    email: "han.regular@example.com",
    role: "regular" as const,
    defaultIdc: "가산3IDC운영"
  },
  "EMP007": {
    name: "윤비정규",
    email: "yoon.contract@example.com",
    role: "contract" as const,
    defaultIdc: "춘천IDC운영"
  },
  "EMP008": {
    name: "백매니저",
    email: "baek.manager@example.com",
    role: "manager" as const,
    defaultIdc: "가산IDC운영"
  },
  "EMP009": {
    name: "서슈퍼",
    email: "seo.super@example.com",
    role: "supermanager" as const,
    defaultIdc: "판교IDC운영"
  },
  "EMP010": {
    name: "오개발",
    email: "oh.dev@example.com",
    role: "developer" as const,
    defaultIdc: "세종IDC운영"
  }
};

export interface EmployeeSearchResult {
  name: string;
  email: string;
  role: "regular" | "contract" | "manager" | "supermanager" | "developer";
  defaultIdc: string;
}

export interface UserProfile {
  employeeId: string;
  name: string;
  email: string;
  role: "regular" | "contract" | "manager" | "supermanager" | "developer";
  defaultIdc: string;
}

export const searchEmployeeByEmployeeId = (employeeId: string): EmployeeSearchResult | null => {
  const employee = mockEmployeeData[employeeId as keyof typeof mockEmployeeData];
  return employee || null;
};

export const getAllUserProfiles = (): UserProfile[] => {
  return Object.entries(mockEmployeeData).map(([employeeId, data]) => ({
    employeeId,
    ...data
  }));
};

export const searchUserProfiles = (query: string): UserProfile[] => {
  const allProfiles = getAllUserProfiles();
  if (!query.trim()) return allProfiles;
  
  const lowerQuery = query.toLowerCase();
  return allProfiles.filter(profile => 
    profile.employeeId.toLowerCase().includes(lowerQuery) ||
    profile.name.toLowerCase().includes(lowerQuery) ||
    profile.email.toLowerCase().includes(lowerQuery)
  );
};
