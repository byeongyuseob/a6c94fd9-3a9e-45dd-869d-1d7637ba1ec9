
export interface Permission {
  id: string;
  employeeId: string;
  name: string;
  idc: string;
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
  idc: string;
  role: "regular" | "contract" | "manager" | "supermanager" | "developer";
}
