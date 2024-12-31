import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SelectedWordContext } from "@/context/SelectedWord";

import NotFoundScreen from "./NotFound";
import WordDetails from "./WordDetails";
import HomeScreen from ".";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SelectedWordContext.Provider value={{ selectedWord, setSelectedWord }}>
      <ThemeProvider value={DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
            <Stack.Screen name="WordDetails" component={WordDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SelectedWordContext.Provider>
  );
}
