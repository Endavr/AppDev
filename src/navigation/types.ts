import { Task } from '../types/index'; // Import the Task type from the types module

export type RootStackParamList = {
  AddTaskScreen: undefined;
  EditTaskScreen: { task: Task };
  TasksList: undefined;
  EditTask: { task: Task };
  // Add other screens here
};