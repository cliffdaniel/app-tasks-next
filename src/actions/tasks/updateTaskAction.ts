import { UpdateTaskUseCase } from '@/modules/tasks/application/use-cases/UpdateTaskUseCase';
import { PrismaTaskRepository } from '@/modules/tasks/infrastructure/PrismaTaskRepository';

/**
 * Update a task by executing the use case.
 * 
 * @param {Object} taskData - The task data to update.
 * @param {string} taskData.id - The ID of the task to update.
 * @param {string} taskData.title - The updated title of the task.
 * @param {string} taskData.description - The updated description of the task.
 * @param {string} taskData.status - The updated status of the task.
 * @param {string} taskData.userId - The user ID associated with the task.
 * @returns {Promise<TaskEntity>} A promise that resolves to the updated task entity.
 */
export async function updateTaskAction(taskData: { id: string; title: string; description: string; status: string, userId: string }) {
    const taskRepository = new PrismaTaskRepository();
    const useCase = new UpdateTaskUseCase(taskRepository);

    return await useCase.execute(taskData);
}
