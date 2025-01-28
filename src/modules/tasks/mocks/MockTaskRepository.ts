import { TaskEntity } from '../domain/TaskEntity';
import { TaskRepository } from '../domain/TaskRepository';

export class MockTaskRepository implements TaskRepository {
    private tasks: TaskEntity[] = [];

    async create(task: TaskEntity): Promise<TaskEntity> {
        this.tasks.push(task);
        return task;
    }

    async findById(id: string): Promise<TaskEntity | null> {
        return this.tasks.find((task) => task.id === id) || null;
    }

    async findAll(skip: number, take: number): Promise<TaskEntity[]> {
        return this.tasks.slice(skip, skip + take);
    }

    async update(task: TaskEntity): Promise<void> {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) this.tasks[index] = task;
    }

    async delete(id: string): Promise<void> {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}
