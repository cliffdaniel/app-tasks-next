import { TaskStatus } from '../domain/TaskEntity';

export function toTaskStatus(status: string): TaskStatus {
    const validStatuses: TaskStatus[] = ['todo', 'in-progress', 'completed'];
    if (validStatuses.includes(status as TaskStatus)) {
        return status as TaskStatus;
    }
    throw new Error(`Invalid status: ${status}`);
}
