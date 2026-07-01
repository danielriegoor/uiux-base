import { describe, expect, it } from "vitest";
import {
  demoEvents,
  demoMetrics,
  demoOrganizations,
  demoProjects,
  demoRecords,
  demoUsers
} from "./fixtures";

describe("demo fixtures", () => {
  it("fornece dados ficticios e neutros para a vitrine", () => {
    const allFixtureText = JSON.stringify({
      demoEvents,
      demoMetrics,
      demoOrganizations,
      demoProjects,
      demoRecords,
      demoUsers
    });

    expect(demoUsers).toHaveLength(4);
    expect(demoOrganizations).toHaveLength(3);
    expect(demoProjects).toHaveLength(6);
    expect(demoMetrics).toHaveLength(5);
    expect(demoEvents).toHaveLength(5);
    expect(demoRecords).toHaveLength(8);
    expect(allFixtureText).not.toMatch(/tatico/i);
  });
});
