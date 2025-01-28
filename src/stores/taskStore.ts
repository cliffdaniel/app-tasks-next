import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TaskEntity } from '@/modules/tasks/domain/TaskEntity';

interface TaskStore {
    tasks: TaskEntity[];
    setTasks: (tasks: TaskEntity[]) => void;
    addTask: (task: TaskEntity) => void;
    updateTask: (task: TaskEntity) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            setTasks: (tasks: TaskEntity[]) => set({ tasks }),
            addTask: (task: TaskEntity) => set((state) => ({ tasks: [...state.tasks, task] })),
            updateTask: (updatedTask: TaskEntity) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            })),
            deleteTask: (id: string) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id)
            })),
        }),
        {
            name: 'task-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
