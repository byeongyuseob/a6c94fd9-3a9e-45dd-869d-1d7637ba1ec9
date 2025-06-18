
export interface User {
  id: string;
  name: string;
  role: 'PM' | 'FrontEnd' | 'BackEnd' | 'Tester' | 'Designer' | 'DevOps' | 'QA' | 'DataAnalyst' | 'ProductOwner' | 'Architect' | 'Marketing' | 'Sales';
}
