import { Department } from "./department.model";
import { Post } from "./post.model";
import { Event } from "./event.model";

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profileImage: string;
  lastLogin: any;
  bio: {
    genre: string;
    birthday: any;
    degree: string;
    description: string;
  };
  socialProfile: {
    fbProfile: string;
    twProfile: string;
    gProfile: string;
  }
  department: Department;
  post: Post[];
  events: Event[];
}