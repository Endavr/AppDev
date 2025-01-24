import { create } from 'zustand';
import { Task, AppSettings } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  tasks: Task[];
  settings: AppSettings;
  addTask: (task: Omit<Task, 'id' | 'completed' | 'missed' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      settings: {
        theme: 'light',
        semesterDates: {
          startDate: new Date(),
          endDate: new Date(),
        },
      },
      addTask: (task) =>
        set((state) => {
          const newTask = {
            ...task,
            id: Date.now().toString(),
            completed: false,
            missed: new Date(task.deadline) < new Date(),
            createdAt: new Date(),
          };
          return {
            tasks: [...state.tasks, newTask],
          };
        }),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id
              ? { ...updatedTask, missed: new Date(updatedTask.deadline) < new Date() }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      completeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed } // Toggle the completed status
              : task
          ),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'task-manager-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
