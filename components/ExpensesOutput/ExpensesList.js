import { FlatList, Text } from "react-native";
import ExpensesItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpensesItem item={itemData.item} />;
}

function ExpensesList({ array }) {
  return (
    <FlatList
      data={array}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
