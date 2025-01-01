import { StatsContext } from "context/Stats";
import { useContext } from "react";

const useStats = () => useContext(StatsContext);

export default useStats;
