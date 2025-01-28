'use client';

import { TaskEntity } from '@/modules/tasks/domain/TaskEntity';

type TaskItemProps = {
    task: TaskEntity;
    onDelete: (id: string) => void;
    onUpdate: (task: TaskEntity) => void;
};

export const TaskItem = ({ task, onDelete, onUpdate }: TaskItemProps) => {
    return (
        <div className="p-4 border rounded-md shadow-sm bg-white">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <div className="mt-4 space-x-2">
                <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => onUpdate(task)}
                >
                    Edit
                </button>
                <button
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
