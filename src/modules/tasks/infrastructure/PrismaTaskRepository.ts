import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../domain/TaskEntity';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskStatusValueObject } from '../domain/TaskStatusValueObject';

const prisma = new PrismaClient();

export class PrismaTaskRepository implements TaskRepository {
    async create(task: TaskEntity): Promise<TaskEntity> {
        try {
            const data = {
                title: task.title,
                description: task.description,
                status: task.getStatus().getValue(),
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                userId: task.userId,
            };
    
            const createdTask = await prisma.task.create({ data });
    
            return new TaskEntity(
                createdTask.id,
                createdTask.title,
                createdTask.description,
                createdTask.createdAt,
                createdTask.updatedAt,
                TaskStatusValueObject.create(createdTask.status),
                createdTask.userId
            );
        } catch (error) {
            console.error('Error during task creation in Prisma:', error);
            throw error;
        }
    }
    
    async findById(id: string): Promise<TaskEntity | null> {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) return null;

        return new TaskEntity(
            task.id,
            task.title,
            task.description,
            task.createdAt,
            task.updatedAt,
            TaskStatusValueObject.create(task.status),
            task.userId,
        );
    }

    async findAllPaginated(page: number, limit: number): Promise<{ data: TaskEntity[]; total: number }> {
        const skip = (page - 1) * limit;

        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.task.count(),
        ]);

        const data = tasks.map(
            (task) =>
                new TaskEntity(
                    task.id,
                    task.title,
                    task.description,
                    task.createdAt,
                    task.updatedAt,
                    TaskStatusValueObject.create(task.status),
                    task.userId,
                ),
        );

        return { data, total };
    }

    async update(task: TaskEntity): Promise<TaskEntity> {
        try {
            const updatedTaskData = await prisma.task.update({
                where: { id: task.id as string },
                data: {
                    title: task.title,
                    description: task.description,
                    status: task.getStatus().getValue(),
                    updatedAt: new Date(),
                },
            });

            return new TaskEntity(
                updatedTaskData.id,
                updatedTaskData.title,
                updatedTaskData.description,
                updatedTaskData.createdAt,
                updatedTaskData.updatedAt,
                TaskStatusValueObject.create(updatedTaskData.status),
                updatedTaskData.userId
            );
        } catch (error) {
            console.error('Error during task update in Prisma:', error);
            throw error;
        }
    }     

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.task.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error during task deletion in Prisma:', error);
            return false;
        }
    }
    
}
