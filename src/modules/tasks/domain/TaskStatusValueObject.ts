export class TaskStatusValueObject {
    public readonly value: 'todo' | 'in-progress' | 'completed';

    private constructor(value: 'todo' | 'in-progress' | 'completed') {
        this.value = value;
    }

    static create(value: string): TaskStatusValueObject {
        if (!['todo', 'in-progress', 'completed'].includes(value)) {
            throw new Error(`Invalid status: ${value}`);
        }
        return new TaskStatusValueObject(value as 'todo' | 'in-progress' | 'completed');
    }

    getValue(): string {
        return this.value;
    }
}
