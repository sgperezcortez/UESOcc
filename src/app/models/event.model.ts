import { User } from './user.model';
import { Department } from './department.model';

export class Event{
  _id: string;
  name: string;
  when: {
    start: any;
    end: any;
  };
  where: string;
  admission: string;
  description: string;
  cost: number;
  author: User;
  department: Department;
  tags: string[];
}