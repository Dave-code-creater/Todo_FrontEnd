import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, addTask, deleteTask, updateTask } from '../../services/task';
// Action creators
export const fetchTasks = createAsyncThunk('task/:id', async (id) => {
	const state = getState();
	const userId = state.authLogin.user.userID; // Adjust this path based on your auth state
	const response = await getTasks(id);

	return response.data;
});

export const addNewTask = createAsyncThunk(
	'task/addNewTask', // This is the action type identifier, unique to Redux.
	async ({ title, description, status, type, deadline, userId }) => {
		const response = await addTask({
			title,
			description,
			status,
			type,
			deadline,
			userId,
		});
		console.log('API call was made and it reached here.');
		return response.data;
	}
);

export const removeTask = createAsyncThunk(
	'task/removeTask',
	async ({ token, id }) => {
		const response = await deleteTask({ token, id });
		return id; // Returning the ID for easier state update
	}
);

export const updateTaskStatus = createAsyncThunk(
	'task/updateTaskStatus',
	async ({ token, id, status }) => {
		const response = await updateTask({ token, id, status });
		return response.data;
	}
);

export const updateTaskContent = createAsyncThunk(
	'task/updateTaskContent',
	async ({ token, id, content }) => {
		const response = await updateTask({ token, id, content });
		return response.data;
	}
);

// Slice definition
const taskSlice = createSlice({
	name: 'task',
	initialState: {
		tasks: [],
		status: 'idle',
		error: null,
		filter: 'all',
	},
	reducers: {
		setFilter(state, action) {
			state.filter = action.payload;
		},
		toggleTaskStatus(state, action) {
			const { id, newStatus } = action.payload;
			const task = state.tasks.find((task) => task.id === id);
			if (task) {
				task.status = newStatus;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addNewTask.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewTask.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks.push(action.payload);
			})
			.addCase(addNewTask.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(removeTask.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = state.tasks.filter(
					(task) => task.id !== action.payload
				);
			})
			.addCase(removeTask.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateTaskStatus.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateTaskStatus.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, status: action.payload.status }
						: task
				);
			})
			.addCase(updateTaskStatus.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateTaskContent.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateTaskContent.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = state.tasks.map((task) =>
					task.id === action.payload.id
						? { ...task, content: action.payload.content }
						: task
				);
			})
			.addCase(updateTaskContent.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});
export const { setTasks, setFilter, toggleTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
