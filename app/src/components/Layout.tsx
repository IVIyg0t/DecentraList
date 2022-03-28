import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  [key: string]: any;
}

export default function Layout({ children, ...props }: Props) {
  return (
    <Flex flexDirection="column" {...props}>
      {children}
    </Flex>
  );
}
