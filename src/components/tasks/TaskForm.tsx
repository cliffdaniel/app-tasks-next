'use client';

import { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { TaskEntity } from '@/modules/tasks/domain/TaskEntity';
import { TaskStatusValueObject } from '@/modules/tasks/domain/TaskStatusValueObject';
import { useTaskStore } from '@/stores/taskStore';

const statuses = ['todo', 'in-progress', 'completed'];

type TaskFormProps = {
    task?: TaskEntity | null;
    onClose: () => void;
};

export const TaskForm = ({ task, onClose }: TaskFormProps) => {
    const { addTask, updateTask } = useTaskStore();
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState<'todo' | 'in-progress' | 'completed'>(task ? task.status.value : 'todo');

    const handleSubmit = async () => {
        try {
            if (task && task.id) {
                const response = await fetch('/api/tasks/updateTask', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: task.id,
                        title,
                        description,
                        status,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update task');
                }

                const updatedTask = await response.json();
                updateTask(
                    new TaskEntity(
                        updatedTask.id,
                        updatedTask.title,
                        updatedTask.description,
                        updatedTask.createdAt,
                        updatedTask.updatedAt,
                        TaskStatusValueObject.create(updatedTask.status.value),
                        updatedTask.userId
                    )
                );
            } else {
                const response = await fetch('/api/tasks/createTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title,
                        description,
                        status,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }

                const newTask = await response.json();
                addTask(
                    new TaskEntity(
                        newTask.id,
                        newTask.title,
                        newTask.description,
                        newTask.createdAt,
                        newTask.updatedAt,
                        TaskStatusValueObject.create(newTask.status.value),
                        newTask.userId
                    )
                );
            }
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
            />
            <TextField
                select
                label="Status"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'completed')}
                margin="normal"
            >
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
            >
                Save
            </Button>
        </form>
    );
};
