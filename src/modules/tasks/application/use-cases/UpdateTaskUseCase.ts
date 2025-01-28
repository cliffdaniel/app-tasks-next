import { TaskRepository } from '../../domain/TaskRepository';
import { TaskEntity } from '../../domain/TaskEntity';
import { TaskStatusValueObject } from '../../domain/TaskStatusValueObject';

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
