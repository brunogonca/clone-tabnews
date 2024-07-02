import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //TESTING UPDATED AT PROPERTY
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  //TESTING DATABASE VERSION
  expect(responseBody.dependencies.database.version).toBe("16.0");
  expect(responseBody.dependencies.database.version).toBeDefined();

  //TESTING DB MAX CONNECTIONS
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  //TESTING OPEN CONNECTIONS
  expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  // expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  //console.log(responseBody.dependencies.database.used_connections);
});
