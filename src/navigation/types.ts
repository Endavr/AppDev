import { Task } from '../types/index'; // Import the Task type from the types module

export type RootStackParamList = {
    Home: undefined;
  AddTaskScreen: undefined;
  EditTaskScreen: { task: Task };
  TasksList: { filter?: 'all' | 'completed' | 'pending' | 'missed' };
  EditTask: { task: Task };
  // Add other screens here
};