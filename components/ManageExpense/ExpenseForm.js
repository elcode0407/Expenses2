import { StyleSheet, View, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { useToast } from "react-native-toast-notifications";
function ExpenseForm({ onCancel, onSubmit, buttonLabel, defaultValues }) {
  const [input, setInput] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toString() : "",
    description: defaultValues ? defaultValues.description : "",
  });
  const toast = useToast();

  function inputChange(inputIdentifier, enteredText) {
    setInput((current) => {
      return {
        ...current,
        [inputIdentifier]: enteredText,
      };
    });
  }
  function confirmExpenseHandler() {
    const expenseData = {
      amount: +input.amount,
      date:
        new Date(input.date).toString() !== "Invalid Date"
          ? new Date(input.date).toISOString().split("T")[0]
          : new Date(input.date),
      description: input.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      toast.show("Invalid Input Values", {
        type: "danger",
        placement: "top",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
      return;
    }
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputContainer}>
        <Input
          textInput={{
            keyboardType: "decimal-pad",
            onChangeText: inputChange.bind(this, "amount"),
            value: input.amount,
          }}
          style={styles.rowInput}
        >
          Amount
        </Input>
        <Input
          textInput={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChange.bind(this, "date"),
            value: input.date,
          }}
          style={styles.rowInput}
        >
          Date
        </Input>
      </View>
      <Input
        textInput={{
          multiline: true,
          onChangeText: inputChange.bind(this, "description"),
          value: input.description,
        }}
      >
        Description
      </Input>
      <View style={styles.buttons}>
        <Button mode={"flat"} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmExpenseHandler}>
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
