import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntity } from '../../domain/TaskEntity';

export class FindTaskByIdUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(id: string): Promise<TaskEntity | null> {
        if (!id) {
            throw new Error('Task ID is required.');
        }

        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error(`Task with ID ${id} not found.`);
        }

        return task;
    }
}
