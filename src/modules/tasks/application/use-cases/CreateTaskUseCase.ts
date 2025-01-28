import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntity } from '../../domain/TaskEntity';
import { TaskStatusValueObject } from '../../domain/TaskStatusValueObject';

/**
 * Use case for creating a new task.
 * 
 * @class CreateTaskUseCase
 * @property {TaskRepository} taskRepository - The repository to handle task storage.
 * @method execute - Executes the task creation process.
 * 
 * @param {Object} taskData - The data required to create a task.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - The description of the task.
 * @param {string} taskData.status - The status of the task.
 * @param {string} taskData.userId - The ID of the user creating the task.
 * @returns {Promise<TaskEntity>} The created task entity.
 */
export class CreateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(taskData: { title: string; description: string, status: string, userId: string; }): Promise<TaskEntity> {
        const task = new TaskEntity(
            null,
            taskData.title,
            taskData.description,
            new Date(),
            new Date(),
            TaskStatusValueObject.create(taskData.status),
            taskData.userId
        );

        return await this.taskRepository.create(task);
    }
}
