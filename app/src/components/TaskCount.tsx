import { Box, Flex, Square, Text } from "@chakra-ui/react";
import { Notification } from "@usedapp/core";
import { BigNumber } from "ethers";
import { LogDescription } from "ethers/lib/utils";
import { useOwnerTaskCount } from "../hooks/useOwnerTaskCount";

interface Props {}
export default function TaskCount({}: Props) {
  const taskCount: any = useOwnerTaskCount();

  return (
    <Square
      display="flex"
      alignItems="center"
      justifyContent="center"
      // background="gray.700"
      borderRadius="xl"
      size="200px"
      py="0"
    >
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text
          // color="white"
          fontSize="md"
        >
          Owner Task Count
        </Text>
        <Square
          // background="gray.800"
          size="50px"
          borderRadius="xl"
          marginTop="1rem"
          padding="2rem"
        >
          <Text
          // color="white"
          >
            {taskCount?.toNumber()}
          </Text>
        </Square>
      </Flex>
    </Square>
  );
}
