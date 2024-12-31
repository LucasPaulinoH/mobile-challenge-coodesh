import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useState } from "react";
import "react-native-reanimated";
import { SelectedWordContext } from "@/context/SelectedWord";

import NotFoundScreen from "./NotFound";
import WordDetails from "./WordDetails";
import HomeScreen from ".";
import Login from ".";

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <SelectedWordContext.Provider value={{ selectedWord, setSelectedWord }}>
      <ThemeProvider value={DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
            <Stack.Screen name="WordDetails" component={WordDetails} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SelectedWordContext.Provider>
  );
}
