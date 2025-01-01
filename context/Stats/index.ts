import { createContext, Dispatch, SetStateAction } from "react";
import { Stats } from "types/stats";

interface StatsContextType {
  stats: Stats | null;
  setStats: Dispatch<SetStateAction<Stats | null>>;
}

export const StatsContext = createContext<StatsContextType>({
  stats: null,
  setStats: () => {},
} as StatsContextType);
