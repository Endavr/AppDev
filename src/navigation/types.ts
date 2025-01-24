import { Task } from '../types/index'; // Import the Task type from the types module

export type RootStackParamList = {
    Home: undefined;
  AddTaskScreen: undefined;
  EditTaskScreen: { task: Task };
  TasksList: { filter?: 'all' | 'completed' | 'pending' | 'missed' };
  EditTask: { task: Task };
  Signup: undefined; // Add 'undefined' if there are no params for the screen
  Login: undefined;
  Main: undefined;
    Settings: undefined;
  // Add other screens here
};