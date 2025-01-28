import { DeleteTaskUseCase } from '@/modules/tasks/application/use-cases/DeleteTaskUseCase';
import { PrismaTaskRepository } from '@/modules/tasks/infrastructure/PrismaTaskRepository';

/**
 * Delete a task by executing the use case.
 * 
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<boolean>} True if the task was deleted successfully, false otherwise.
 */
export async function deleteTaskAction(id: string): Promise<boolean> {
    const taskRepository = new PrismaTaskRepository();
    const useCase = new DeleteTaskUseCase(taskRepository);

    return await useCase.execute(id);
}
