
export const getRoleColor = (role: string) => {
  switch (role) {
    case "developer":
      return "bg-purple-100 text-purple-800";
    case "supermanager":
      return "bg-red-100 text-red-800";
    case "manager":
      return "bg-blue-100 text-blue-800";
    case "regular":
      return "bg-green-100 text-green-800";
    case "contract":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case "developer":
      return "Developer";
    case "supermanager":
      return "Supermanager";
    case "manager":
      return "Manager";
    case "regular":
      return "Regular";
    case "contract":
      return "Contract";
    default:
      return "Unknown";
  }
};

export const getDefaultPermissions = (role: "regular" | "contract" | "manager" | "supermanager" | "developer") => {
  return {
    read: true,
    write: role === "manager" || role === "supermanager" || role === "developer",
    delete: role === "supermanager" || role === "developer",
    manage: role === "developer",
  };
};
