import { TaskRepository } from '@/modules/tasks/domain/TaskRepository';
import { TaskEntity } from '@/modules/tasks/domain/TaskEntity';

/**
 * Use case for finding all tasks with pagination.
 * 
 * @class FindAllTasksUseCase
 * @property {TaskRepository} taskRepository - The repository to handle task storage and retrieval.
 * @method execute - Executes the process of fetching tasks with pagination.
 * 
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of tasks per page.
 * @returns {Promise<{ data: TaskEntity[]; total: number }>} The paginated task data and total count.
 */
export class FindAllTasksUseCase {
    private taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async execute(page: number, limit: number): Promise<{ data: TaskEntity[]; total: number }> {
        return this.taskRepository.findAllPaginated(page, limit);
    }
}
