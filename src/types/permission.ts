
export interface Permission {
  id: string;
  employeeId: string;
  name: string;
  idc: string[]; // Changed from string to string array
  role: "regular" | "contract" | "manager" | "supermanager" | "developer";
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manage: boolean;
  };
  createdDate: string;
  modifiedDate: string;
  email: string; // keeping for compatibility with dialogs
  lastActive: string; // keeping for compatibility
}

export interface NewUser {
  employeeId: string;
  name: string;
  email: string;
  idc: string[]; // Changed from string to string array
  role: "regular" | "contract" | "manager" | "supermanager" | "developer";
}

export const IDC_OPTIONS = [
  "춘천IDC운영",
  "가산IDC운영", 
  "가산2IDC운영",
  "가산3IDC운영",
  "평촌IDC운영",
  "평촌2IDC운영",
  "판교IDC운영",
  "세종IDC운영",
  "죽전IDC운영",
  "대전IDC운영",
  "부산IDC운영"
] as const;
