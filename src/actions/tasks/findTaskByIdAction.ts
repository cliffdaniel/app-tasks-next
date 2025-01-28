'use server';

import { FindTaskByIdUseCase } from '@/modules/tasks/application/use-cases/FindTaskByIdUseCase';
import { PrismaTaskRepository } from '@/modules/tasks/infrastructure/PrismaTaskRepository';

/**
 * Find a task by its ID by executing the use case.
 * 
 * @param {string} id - The ID of the task to find.
 * @returns {Promise<TaskEntity>} A promise that resolves to the task entity if found.
 * @throws {Error} If the task is not found or an error occurs during retrieval.
 */
export async function findTaskByIdAction(id: string) {
    const taskRepository = new PrismaTaskRepository();
    const findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository);

    try {
        const task = await findTaskByIdUseCase.execute(id);

        if (!task) {
            throw new Error(`Task with ID ${id} not found.`);
        }

        return task;
    } catch (error) {
        console.error('Error finding task:', error);
        throw new Error('Unable to find task. Please try again.');
    }
}
