import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenses,
  deleteExpenses,
  updateExpense,
} from "../store/redux/expenses";
import { useToast } from "react-native-toast-notifications";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { store } from "../store/redux/store";
import { storeExpense } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const toast = useToast();

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  function deleteExpenseHandler() {
    setIsSubmitting(true);
    console.log(expenseId);
    dispatch(deleteExpenses({ id: expenseId }));

    toast.show("Deleted", {
      type: "danger",
      placement: "bottom",
      duration: 2000,
      offset: 10,
      animationType: "zoom-in",
    });
    navigation.goBack();
  }
  function cancelExpenseHandler() {
    navigation.goBack();
  }
  async function confirmExpenseHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      dispatch(
        updateExpense({
          id: expenseId,
          data: expenseData,
        })
      );
      toast.show("Updated", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 10,
        animationType: "zoom-in",
      });
    } else {
      const id = await storeExpense(expenseData);

      dispatch(
        addExpenses({
          data: expenseData,
          id: id,
        })
      );
      toast.show("Added", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 10,
        animationType: "zoom-in",
      });
    }
    navigation.goBack();
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelExpenseHandler}
        onSubmit={confirmExpenseHandler}
        buttonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName={"trash"}
            color={GlobalStyles.colors.error500}
            size={28}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
