import { Department } from './department.model';

export class Career {
  _id: string;
  name: string;
  description: string;
  dischargeProfile: string;
  admissionProfile: string;
  workArea: string;
  department: Department;
  datePublish: any;
  tags: string[];
}