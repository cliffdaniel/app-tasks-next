import { TaskRepository } from '../../domain/TaskRepository';

/**
 * Use case for deleting a task.
 * 
 * @class DeleteTaskUseCase
 * @property {TaskRepository} taskRepository - The repository to handle task storage.
 * @method execute - Executes the task deletion process.
 * 
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<boolean>} True if the task was successfully deleted, otherwise false.
 */
export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(id: string): Promise<boolean> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            return false;
        }

        await this.taskRepository.delete(id);
        return true;
    }
}
