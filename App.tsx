import "react-native-gesture-handler";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@expo/metro-runtime";
import Routes from "./routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}
