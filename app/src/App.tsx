import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import "./App.css";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/Modals/AccountModal";
import TaskCount from "./components/TaskCount";
import Nav from "./components/Nav";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList";
import ColorMode from "./components/ColorMode";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Flex
        flexDirection="column"
        h="100vh"
        // bg="gray.800"
      >
        <Nav>
          <Heading
            // color="gray.200"
            size="lg"
            paddingLeft="1rem"
          >
            DecentraList
          </Heading>
          <Spacer />
          <ColorMode />
          <ConnectButton onOpen={onOpen} />
        </Nav>
        <Flex flexDirection="row" w="100%" h="80vh" alignItems="center">
          <Flex flexDirection="column" padding="2rem">
            <TaskCount />
          </Flex>
          <Flex
            flexDirection="column"
            grow={1}
            padding="2rem"
            margin="1rem"
            // background="gray.700"
            borderRadius="xl"
          >
            <CreateTask />
            <TaskList />
          </Flex>
        </Flex>
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
