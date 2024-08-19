import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, addTask, updateTask } from '../../services/task';
// Action creators
export const fetchTasks = createAsyncThunk('task/:id', async (userId) => {
	
	const response = await getTasks(userId);

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
		return response.data;
	}
);



export const updateStatus = createAsyncThunk(
	'task/updateTaskStatus',
	async ({  id, status }) => {
		const response = await updateTask({  id, status });
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
			.addCase(updateStatus.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateStatus.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = state.tasks.map((task) =>
					task._id === action.payload._id
						? { ...task, status: action.payload.status }
						: task
				);
			})
			.addCase(updateStatus.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			
	},
});
export const { setTasks, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
