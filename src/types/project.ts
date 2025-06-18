
import { User } from './user';

export interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  memberCount: number;
  members: User[];
}
