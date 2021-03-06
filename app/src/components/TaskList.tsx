import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";
import useTriggerEffect from "react-use-trigger/useTriggerEffect";
import { CONTRACT_ADDRESS } from "../config";
import { triggerTaskCreated } from "./CreateTask/CreateTask";
import TodoABI from "../abi/TodoList.json";
import createTrigger from "react-use-trigger";
import { useEffect } from "react";

const triggerTaskCompleted = createTrigger();

export default function TaskList() {
  const { state: tasksState, send: getOwnerTasks } = useContractFunction(
    new Contract(CONTRACT_ADDRESS, TodoABI),
    "getOwnerTasks"
  );

  const {
    state: toggleCompletedState,
    send: toggleCompleted,
    events,
  } = useContractFunction(
    new Contract(CONTRACT_ADDRESS, TodoABI),
    "toggleCompleted"
  );

  const [taskCompleted] = events ?? [];

  useEffect(() => {
    if (taskCompleted) {
      triggerTaskCompleted();
      getOwnerTasks();
    }
  }, [taskCompleted]);

  useTriggerEffect(() => {
    getOwnerTasks();
  }, triggerTaskCreated);

  return (
    <Box maxH="400px" overflowY="scroll" marginTop="1rem">
      <Heading size={"sm"}>Todo's</Heading>
      <Table
        variant="simple"
        // color="white"
      >
        <TableCaption>Task List</TableCaption>
        <Thead>
          <Tr>
            <Td>ID</Td>
            <Td>Content</Td>
            <Td>Completed</Td>
            <Td>Actions</Td>
          </Tr>
        </Thead>
        <Tbody>
          {(tasksState?.transaction as unknown as any[])?.map((task) => (
            <Tr>
              <Td>{task.id.toNumber()}</Td>
              <Td>{task.content}</Td>
              <Td>{task.completed ? "True" : "False"}</Td>
              {!task.completed ? (
                <Td>
                  <Button
                    onClick={() => {
                      toggleCompleted(task.id.toNumber());
                    }}
                  >
                    Complete
                  </Button>
                </Td>
              ) : (
                <Td></Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
