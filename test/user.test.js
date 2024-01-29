// Packages
const request = require("supertest");

// Application
const app = require("../app");

describe("User API Endpoints", () => {
  // Test data for creating a user
  const newUser = {
    email: "testuser@example.com",
    name: "Test User",
    age: 26,
    country: "Country",
    mobile: "+1234567890",
  };

  // Variable to hold the created user ID
  let createdUserId;

  // Test for creating a new user
  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/user").send(newUser);

    // Ensure a successful response
    expect(response.statusCode).toBe(201);
    // Ensure the response contains the created user data
    expect(response.body).toHaveProperty("data");
    // Save the created user ID for later tests
    createdUserId = response.body.data.id;
  });

  // Test for getting all users
  it("should get all users", async () => {
    const response = await request(app).get("/api/v1/user");

    // Ensure a successful response
    expect(response.statusCode).toBe(200);
    // Ensure the response contains an array of users
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test for getting a user by ID
  it("should get a user by ID", async () => {
    const response = await request(app).get(`/api/v1/user/${createdUserId}`);

    // Ensure a successful response
    expect(response.statusCode).toBe(200);
    // Ensure the response contains the requested user data
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(createdUserId);
  });

  // Test for updating a user by ID
  it("should update a user by ID", async () => {
    const updatedUserData = {
      name: "Updated User",
    };

    const response = await request(app)
      .patch(`/api/v1/user/${createdUserId}`)
      .send(updatedUserData);

    // Ensure a successful response
    expect(response.statusCode).toBe(200);
    // Ensure the response contains the updated user data
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(createdUserId);
    expect(response.body.data.name).toBe(updatedUserData.name);
  });

  // Test for deleting a user by ID
  it("should delete a user by ID with basic authentication", async () => {
    const credentials = Buffer.from("admin:admin@123").toString("base64");

    const response = await request(app)
      .delete(`/api/v1/user/${createdUserId}`)
      // Add basic authentication headers
      .set("Authorization", `Basic ${credentials}`);

    // Ensure a successful response
    expect(response.statusCode).toBe(200);
    // Ensure the response contains the deleted user data
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.id).toBe(createdUserId);
  });
});
