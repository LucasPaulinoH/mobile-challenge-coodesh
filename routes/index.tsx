import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SelectedWordContextProvider from "context/SelectedWord/provider";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Home from "screens/home";
import Login from "screens/login";
import WordDetails from "screens/wordDetails";
import { FIREBASE_AUTH } from "utils/firebaseConfig";

const Stack = createStackNavigator();
const LoggedStack = createStackNavigator();

function LoggedLayout() {
  return (
    <LoggedStack.Navigator screenOptions={{ headerShown: false }}>
      <LoggedStack.Screen name="Home" component={Home} />
      <LoggedStack.Screen name="WordDetails" component={WordDetails} />
    </LoggedStack.Navigator>
  );
}

export default function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => setUser(user));
  }, []);

  return (
    <SelectedWordContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {user ? (
            <Stack.Screen name="Logged" component={LoggedLayout} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SelectedWordContextProvider>
  );
}
