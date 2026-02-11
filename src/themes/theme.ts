import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      bg: "cyan.50",
      color: "gray.700",
    },
  },
});

export default createSystem(defaultConfig, config);
