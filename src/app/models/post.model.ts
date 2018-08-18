import { User } from './user.model';
import { Department } from './department.model';

export class Post {
  _id: string;
  title: string;
  imagePost: string;
  lead: string;
  body: string;
  author: User;
  department: Department;
  datePublish: any;
  tags: string[];
}