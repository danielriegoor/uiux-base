import { describe, expect, it } from "vitest";
import {
  dashboardMetrics,
  eventFixtures,
  organizationFixtures,
  projectFixtures,
  recordFixtures,
  userFixtures
} from "./fixtures";

describe("starter fixtures", () => {
  it("mantem dados genericos e cobre colecoes basicas do template", () => {
    const allFixtureText = JSON.stringify({
      dashboardMetrics,
      eventFixtures,
      organizationFixtures,
      projectFixtures,
      recordFixtures,
      userFixtures
    });

    expect(userFixtures).toHaveLength(3);
    expect(organizationFixtures).toHaveLength(2);
    expect(projectFixtures).toHaveLength(4);
    expect(dashboardMetrics).toHaveLength(4);
    expect(eventFixtures).toHaveLength(4);
    expect(recordFixtures).toHaveLength(6);
    expect(allFixtureText).not.toMatch(/tatico/i);
  });
});
