import { FindAllTasksUseCase } from '@/modules/tasks/application/use-cases/FindAllTasksUseCase';
import { PrismaTaskRepository } from '@/modules/tasks/infrastructure/PrismaTaskRepository';

/**
 * Find all tasks by executing the use case with pagination.
 * 
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of tasks per page.
 * @returns {Promise<{ data: TaskEntity[]; total: number }>} A promise that resolves to the tasks data and total count.
 */
export async function findAllTasksAction(page: number, limit: number) {
    const taskRepository = new PrismaTaskRepository();
    const useCase = new FindAllTasksUseCase(taskRepository);

    return await useCase.execute(page, limit);
}
