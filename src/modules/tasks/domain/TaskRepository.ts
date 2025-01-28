import { TaskEntity } from './TaskEntity';

export interface TaskRepository {
    create(task: TaskEntity): Promise<TaskEntity>;
    findById(id: string): Promise<TaskEntity | null>;
    findAllPaginated(page: number, limit: number): Promise<{ data: TaskEntity[]; total: number }>;
    update(task: TaskEntity): Promise<TaskEntity>;
    delete(id: string): Promise<boolean>;
}
