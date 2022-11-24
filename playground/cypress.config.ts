import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // @ts-ignore
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
