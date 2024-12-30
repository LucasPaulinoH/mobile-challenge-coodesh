import { apiServices } from "@/services";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    const fetchWordDefinition = async () => {
      try {
        const response = await apiServices.getWordDefinition("run");
        console.log(response);
      } catch (error) {
        console.warn("error getting word: ", error);
      }
    };

    fetchWordDefinition();
  }, []);

  return <View></View>;
}
