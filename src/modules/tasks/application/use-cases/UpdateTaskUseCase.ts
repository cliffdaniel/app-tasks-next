import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntity } from '../../domain/TaskEntity';
import { TaskStatusValueObject } from '../../domain/TaskStatusValueObject';

/**
 * Use case for updating an existing task.
 * 
 * @class UpdateTaskUseCase
 * @property {TaskRepository} taskRepository - The repository to handle task storage and updates.
 * @method execute - Executes the process of updating a task.
 * 
 * @param {Object} taskData - The data to update the task.
 * @param {string} taskData.id - The ID of the task to update.
 * @param {string} taskData.title - The updated title of the task.
 * @param {string} taskData.description - The updated description of the task.
 * @param {string} taskData.status - The updated status of the task.
 * @param {string} taskData.userId - The user ID associated with the task.
 * @returns {Promise<TaskEntity>} The updated task entity.
 * @throws {Error} If the task is not found.
 */
export class UpdateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(taskData: { id: string; title: string; description: string; status: string, userId: string }): Promise<TaskEntity> {
        const { id, title, description, status, userId } = taskData;
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error('Task not found');
        }

        const updatedStatus = TaskStatusValueObject.create(status);

        const updatedTask = new TaskEntity(
            task.id,
            title,
            description,
            task.createdAt,
            new Date(),
            updatedStatus,
            userId
        );

        return await this.taskRepository.update(updatedTask);
    }
}
