import { CONTRACT_ADDRESS } from "../config";
import TodoABI from "../abi/TodoList.json";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import createTrigger from "react-use-trigger";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";

export const triggerTaskCount = createTrigger();

interface Props {}
export function useOwnerTaskCount<T>() {
  const { state, send } = useContractFunction(
    new Contract(CONTRACT_ADDRESS, TodoABI),
    "getOwnerTaskCount"
  );

  useTriggerEffect(() => {
    send();
  }, triggerTaskCount);

  return state.transaction;
}
