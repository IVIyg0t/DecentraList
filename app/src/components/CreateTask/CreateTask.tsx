import { useContractFunction } from "@usedapp/core";
import { CONTRACT_ADDRESS } from "../../config";
import TodoABI from "../../abi/TodoList.json";
import { Contract } from "ethers";
import { Field, Form, Formik, useField } from "formik";
import { Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LogDescription } from "ethers/lib/utils";
import { triggerTaskCount } from "../../hooks/useOwnerTaskCount";
import createTrigger from "react-use-trigger";
import * as Yup from "yup";

const VALIDATION_SCHEMA = Yup.object().shape({
  taskContent: Yup.string().required(),
});

export const triggerTaskCreated = createTrigger();

interface Props {}
export default function CreateTask({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { state, send, events } = useContractFunction(
    new Contract(CONTRACT_ADDRESS, TodoABI),
    "createTask"
  );

  useEffect(() => {
    if (events) {
      events.forEach((event) => {
        switch (event.name) {
          case "TaskCreated":
            triggerTaskCreated();
            triggerTaskCount();
            break;
          default:
            break;
        }
      });
    }
  }, [events]);

  useEffect(() => {
    switch (state?.status) {
      case "PendingSignature":
      case "Mining":
        setIsLoading(true);
        break;
      case "Fail":
      case "Success":
      case "None":
      default:
        setIsLoading(false);
        break;
    }
  }, [state?.status]);

  return (
    <Formik
      initialValues={{
        taskContent: "",
      }}
      onSubmit={(values, { resetForm, validateForm }) => {
        send(values.taskContent);
        resetForm();
        validateForm();
      }}
      validationSchema={VALIDATION_SCHEMA}
      validateOnMount
      validateOnChange
    >
      {({ isValid }) => {
        return (
          <Form id="new-todo-form">
            <HStack
              display="flex"
              // background="gray.700"
              borderRadius="xl"
              py="0"
              padding="1rem"
            >
              <Field
                as={Input}
                name="taskContent"
                placeholder="Task Name"
                // color="white"
              />
              <Button
                type="submit"
                borderRadius="xl"
                disabled={!isValid}
                isLoading={isLoading}
                colorScheme={isValid ? "purple" : undefined}
                isActive={isValid ? true : undefined}
              >
                Create Todo
              </Button>
            </HStack>
          </Form>
        );
      }}
    </Formik>
  );
}
