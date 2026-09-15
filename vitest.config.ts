import { defineConfig } from "vitest/config";
import FailedAtBottomReporter from "./failed-at-bottom-reporter.js";

export default defineConfig({
  test: {
    reporters: ["default", new FailedAtBottomReporter()],
  },
});