import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../../services/user";

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id) => {
    const response = await getUserById(id);
    return response.data;
}
);

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await getUsers();
    return response.data;
}
);

export const createNewUser = createAsyncThunk('user/createUser', async (user) => {
    const response = await createUser(user);
    return response.data;
}
);

export const updateUserInfo = createAsyncThunk('user/updateUser', async (user) => {
    const response = await updateUser(user);
    return response.data;
}
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.users.findIndex((user) => user._id === action.payload._id) === -1)
                {
                    state.users.push(action.payload);
                }
                
                
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                const { id, name, email, phone, role } = action.payload;
                const existingUser = state.users.find((user) => user.id === id);
                if (existingUser) {
                    existingUser.name = name;
                    existingUser.email = email;
                    existingUser.phone = phone;
                    existingUser.role = role;
                }
            })

    },
});

export default userSlice.reducer;