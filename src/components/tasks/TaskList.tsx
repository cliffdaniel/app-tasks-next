'use client';

import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TaskEntity } from '@/modules/tasks/domain/TaskEntity';
import { TaskForm } from './TaskForm';
import { useTaskStore } from '@/stores/taskStore';

export const TaskList = () => {
    const { tasks, setTasks, deleteTask } = useTaskStore();
    const [openModal, setOpenModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskEntity | null>(null);

    useEffect(() => {
        if (tasks.length === 0) {
            async function fetchTasks() {
                try {
                    const response = await fetch('/api/tasks?page=1&limit=10');
                    const data = await response.json();
                    setTasks(data.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            }
            fetchTasks();
        }
    }, [tasks.length, setTasks]);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting task');
            }

            deleteTask(id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task: TaskEntity) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const handleCreate = () => {
        setSelectedTask(null);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTask(null);
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 0.2 },
        { field: 'description', headerName: 'Description', flex: 0.4 },
        { 
            field: 'status', 
            headerName: 'Status', 
            flex: 0.2,
            renderCell: (params: GridRenderCellParams) => params.row.status.value
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.2,
            renderCell: (params: GridRenderCellParams<TaskEntity>) => (
                <>
                    <Button
                        onClick={() => handleEdit(params.row)}
                        variant="contained"
                        size="small"
                        color="primary"
                        sx={{ marginRight: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(params.row.id!)}
                        variant="contained"
                        size="small"
                        color="error"
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Button
                onClick={handleCreate}
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
            >
                Create Task
            </Button>
            <DataGrid
                rows={tasks}
                columns={columns}
                getRowId={(row) => row.id}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                            page: 0,
                        },
                    },
                }}
                pageSizeOptions={[10, 20, 50]}
                disableRowSelectionOnClick
            />
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedTask ? 'Edit Task' : 'Create Task'}</DialogTitle>
                <DialogContent>
                    <TaskForm
                        task={selectedTask}
                        onClose={handleCloseModal}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
