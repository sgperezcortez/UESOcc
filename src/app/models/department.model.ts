import { User } from './user.model';
import { Career } from './career.model';
import { Post } from './post.model';
import { Event } from './event.model';

export class Department {
  _id: string;
  name: string;
  workArea: string;
  users: User[];
  careers: Career[];
  posts: Post[];
  events: Event[];
}