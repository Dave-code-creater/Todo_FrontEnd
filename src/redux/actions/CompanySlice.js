import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCompany, createCompany, updateCompany, getEmployeeByCompanyUUID, deleteCompany, addEmployee } from '../../services/company';

export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async (id) => {
    const response = await getCompany(id);
    return response.data;
});

export const fetchEmployeeAndAdminFromCompany = createAsyncThunk('company/fetchEmployeeAndAdmin', async (companyUUID) => {
    const response = await getEmployeeByCompanyUUID(companyUUID);
    return response.data;
});

export const createNewCompany = createAsyncThunk('company/createCompany', async (company) => {
    const response = await createCompany(company);
    return response.data;
}
);

export const updateCompanyInfo = createAsyncThunk('company/updateCompany', async (company) => {
    const response = await updateCompany(company);
    return response.data;
}
);

export const deleteCompanyInfo = createAsyncThunk('company/deleteCompany', async (company) => {
    const response = await deleteCompany(company);
    return response.data;
}
);

export const addEmployeeByCompanyUUID = createAsyncThunk('company/addEmployee', async ({ companyUUID, id }) => {
    const response = await addEmployee({ companyUUID, id });
    return response.data;
}

);

export const removeEmployee = createAsyncThunk('company/removeEmployee', async (employee) => {
    const response = await removeEmployee(employee);
    return response.data;
}
);

const companySlice = createSlice({
    name: 'company',
    initialState: {
        companies: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(state.companies.findIndex((company) => company.id === action.payload.id) === -1) {
                    state.companies.push(action.payload);
                }
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(createNewCompany.fulfilled, (state, action) => {
                state.company.push(action.payload);
            });
        builder
            .addCase(updateCompanyInfo.fulfilled, (state, action) => {
                const { id, name, description, address, phone, email, website } = action.payload;
                const existingCompany = state.company.find((company) => company.id === id);
                if (existingCompany) {
                    existingCompany.name = name;
                    existingCompany.description = description;
                    existingCompany.address = address;
                    existingCompany.phone = phone;
                    existingCompany.email = email;
                    existingCompany.website = website;
                }
            });
        builder
            .addCase(fetchEmployeeAndAdminFromCompany.fulfilled, (state, action) => {
                state.employee = action.payload.employees;  // Assuming payload contains employees list
                state.admin = action.payload.admin;  // Assuming payload contains admin list
            });
        builder
            .addCase(deleteCompanyInfo.fulfilled, (state, action) => {
                const { id } = action.payload;
                const existingCompany = state.company.find((company) => company.id === id);
                if (existingCompany) {
                    state.company = state.company.filter((company) => company.id !== id);
                }
            });
        builder
            .addCase(addEmployeeByCompanyUUID.fulfilled, (state, action) => {
                state.company.push(action.payload);
            });
        builder
            .addCase(removeEmployee.fulfilled, (state, action) => {
                const { id } = action.payload;
                const existingEmployee = state.company.find((employee) => employee.id === id);
                if (existingEmployee) {
                    state.company = state.company.filter((employee) => employee.id !== id);
                }
            });
    },
});

export default companySlice.reducer;