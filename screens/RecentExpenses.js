import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";
import { useEffect, useState } from "react";
import { getExpenses } from "../util/http";
import { setExpenses } from "../store/redux/expenses";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";
function RecentExpenses() {
  const [isFetching, steIsFetching] = useState(true);
  // const [error, setError] = useState();
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchExpenses() {
      steIsFetching(true);
      // try {
      const expenses = await getExpenses();
      dispatch(setExpenses({ expenses: expenses }));
      // } catch (error) {
      //   setError("Could not fetch expenses!!");
      // }
      steIsFetching(false);
    }

    fetchExpenses();
  }, []);

  // function errorHandler() {
  //   setError(null);
  // }
  // if (error && !isFetching) {
  //   return <ErrorOverlay message={error} onConfirm={errorHandler()} />;
  // }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  console.log(expenses);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const dateObject = new Date(expense.date);
    return dateObject >= date7DaysAgo && dateObject <= today;
  });
  return (
    <ExpensesOutput expenses={recentExpenses} periodName={"Last 7 days"} />
  );
}

export default RecentExpenses;
