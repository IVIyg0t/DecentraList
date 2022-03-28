import { Flex, useColorMode } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}
export default function Nav({ children }: Props) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      h="10vh"
      w="100%"
      bg={colorMode === "dark" ? "gray.900" : "gray.100"}
    >
      {children}
    </Flex>
  );
}
