
export const getRoleColor = (role: string) => {
  switch (role) {
    case "developer":
      return "bg-purple-100 text-purple-800";
    case "supermanager":
      return "bg-red-100 text-red-800";
    case "manager":
      return "bg-blue-100 text-blue-800";
    case "operator":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case "developer":
      return "개발자";
    case "supermanager":
      return "슈퍼매니저";
    case "manager":
      return "매니저";
    case "operator":
      return "운영자";
    default:
      return "알 수 없음";
  }
};

export const getDefaultPermissions = (role: "operator" | "manager" | "supermanager" | "developer") => {
  return {
    read: true,
    write: role !== "operator",
    delete: role === "supermanager" || role === "developer",
    manage: role === "developer",
  };
};
