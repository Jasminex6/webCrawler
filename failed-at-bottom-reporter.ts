import type { Reporter, TestModule } from "vitest/node";

export default class FailedAtBottomReporter implements Reporter {
  onTestRunEnd(testModules: ReadonlyArray<TestModule>) {
    const failedTests: string[] = [];

    for (const module of testModules) {
      for (const test of module.children.allTests()) {
        if (test.result().state === "failed") {
          failedTests.push(test.fullName);
        }
      }
    }

    if (failedTests.length === 0) return;

    console.log("\nFAILED TESTS:");
    for (const name of failedTests) {
      console.log(`✗ ${name}`);
    }
  }
}