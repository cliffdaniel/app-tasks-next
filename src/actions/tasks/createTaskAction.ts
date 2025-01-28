import { PrismaTaskRepository } from '@/modules/tasks/infrastructure/PrismaTaskRepository';
import { CreateTaskUseCase } from '@/modules/tasks/application/use-cases/CreateTaskUseCase';

/**
 * Create a new task by executing the use case.
 * 
 * @param {Object} taskData - The task data to create.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - The description of the task.
 * @param {string} taskData.status - The status of the task.
 * @param {string} taskData.userId - The ID of the user creating the task.
 * @returns {Promise<TaskEntity>} The created task.
 */
export async function createTaskAction(taskData: { title: string; description: string; status: string, userId: string; }) {
    const taskRepository = new PrismaTaskRepository();
    const useCase = new CreateTaskUseCase(taskRepository);

    return await useCase.execute(taskData);
}
