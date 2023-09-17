import { createSlice } from "@reduxjs/toolkit";
import { useToast } from "react-native-toast-notifications";
import { updateExpenseHttp, deleteExpenseHttp } from "../../util/http";
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      const inverted = action.payload.expenses.reverse();
      state.expenses = inverted;
    },
    addExpense: (state, action) => {
      state.expenses.push({ ...action.payload.data, id: action.payload.id });
    },
    deleteExpense: (state, action) => {
      const idToDelete = action.payload.id;
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== idToDelete
      );
      deleteExpenseHttp(idToDelete);
    },
    updateExpense: (state, action) => {
      const updatableIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updated = state.expenses[updatableIndex];
      const updatedItem = { ...updated, ...action.payload.data };
      const expenses = [...state.expenses];
      expenses[updatableIndex] = updatedItem;
      state.expenses = expenses;
      updateExpenseHttp(action.payload.id, action.payload.data);
    },
  },
});

export const setExpenses = expensesSlice.actions.setExpenses;
export const addExpenses = expensesSlice.actions.addExpense;
export const deleteExpenses = expensesSlice.actions.deleteExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export default expensesSlice.reducer;
