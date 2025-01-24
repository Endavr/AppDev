export interface Task {
    id: string;
    title: string;
    description: string;
    tags: string[];
    deadline: Date;
    completed: boolean;
    missed: boolean;
    createdAt: Date;
  }
  
  export interface SemesterDates {
    startDate: Date;
    endDate: Date;
  }
  
  export interface AppSettings {
    theme: 'light' | 'dark';
    semesterDates: SemesterDates;
  }