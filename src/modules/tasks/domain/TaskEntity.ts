import { TaskStatusValueObject } from './TaskStatusValueObject';

export class TaskEntity {
    constructor(
        public readonly id: string | null,
        public readonly title: string,
        public readonly description: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
        public status: TaskStatusValueObject = TaskStatusValueObject.create('todo'),
        public readonly userId: string
    ) {}

    updateStatus(newStatus: string): void {
        this.status = TaskStatusValueObject.create(newStatus);
    }

    getStatus(): TaskStatusValueObject {
        return this.status;
    }
}
