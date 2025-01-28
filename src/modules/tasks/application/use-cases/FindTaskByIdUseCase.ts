import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntity } from '../../domain/TaskEntity';

/**
 * Use case for finding a task by its ID.
 * 
 * @class FindTaskByIdUseCase
 * @property {TaskRepository} taskRepository - The repository to handle task retrieval.
 * @method execute - Executes the process of finding a task by its ID.
 * 
 * @param {string} id - The ID of the task to find.
 * @returns {Promise<TaskEntity | null>} The task entity if found, otherwise null.
 * @throws {Error} If the ID is missing or the task is not found.
 */
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
