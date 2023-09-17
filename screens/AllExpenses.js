import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
function AllExpenses() {
  const expenses = useSelector((state) => state.expenses.expenses);
  return <ExpensesOutput expenses={expenses} periodName={"Total"} />;
}

export default AllExpenses;
