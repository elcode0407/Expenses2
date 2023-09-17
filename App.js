import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/ui/IconButton";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import { ToastProvider } from "react-native-toast-notifications";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabNavigator() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <Tabs.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({ tintColor }) => {
              return (
                <IconButton
                  iconName={"add"}
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("ManageExpense");
                  }}
                />
              );
            },
          })}
        >
          <Tabs.Screen
            name="RecentExpenses"
            component={RecentExpenses}
            options={{
              title: "Recent Expenses",
              tabBarLabel: "Recent",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="hourglass" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
              title: "All Expenses",
              tabBarLabel: "All Expenses",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" size={size} color={color} />
              ),
            }}
          />
        </Tabs.Navigator>
      </Provider>
    </ToastProvider>
  );
}

export default function App() {
  return (
    <>
      <ToastProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </>
  );
}
