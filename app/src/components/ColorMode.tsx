import { Button, useColorMode } from "@chakra-ui/react";

export default function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} marginX="1rem">
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
}
