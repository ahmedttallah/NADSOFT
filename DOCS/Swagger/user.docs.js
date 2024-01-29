const userRoutesDocs = {
  "/user": {
    post: {
      tags: ["User"],
      summary: "Create a new user",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "user@example.com",
                },
                name: { type: "string", example: "John Doe" },
                age: { type: "integer", example: 25 },
                country: { type: "string", example: "Country" },
                mobile: { type: "string", example: "+1234567890" },
              },
              required: ["email", "name", "age", "country", "mobile"],
            },
          },
        },
        required: true,
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "user@example.com" },
                      name: { type: "string", example: "John Doe" },
                      age: { type: "integer", example: 25 },
                      country: { type: "string", example: "Country" },
                      mobile: { type: "string", example: "+1234567890" },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Please provide all fields",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Internal Server Error" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },

    get: {
      tags: ["User"],
      summary: "Get all users",
      responses: {
        200: {
          description: "Users retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Users retrieved successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", example: "user-id" },
                        email: { type: "string", example: "user@example.com" },
                        name: { type: "string", example: "John Doe" },
                        age: { type: "integer", example: 25 },
                        country: { type: "string", example: "Country" },
                        mobile: { type: "string", example: "+1234567890" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Internal Server Error" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/user/{id}": {
    get: {
      tags: ["User"],
      summary: "Get a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID",
        },
      ],
      responses: {
        200: {
          description: "User retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "user@example.com" },
                      name: { type: "string", example: "John Doe" },
                      age: { type: "integer", example: 25 },
                      country: { type: "string", example: "Country" },
                      mobile: { type: "string", example: "+1234567890" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "User not found" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Internal Server Error" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },

    patch: {
      tags: ["User"],
      summary: "Update a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Updated Name" },
              },
              required: ["name"],
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "user@example.com" },
                      name: { type: "string", example: "Updated Name" },
                      age: { type: "integer", example: 25 },
                      country: { type: "string", example: "Country" },
                      mobile: { type: "string", example: "+1234567890" },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Please provide a valid name",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "User not found" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Internal Server Error" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },

    delete: {
      tags: ["User"],
      summary: "Delete a user by ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "User ID",
        },
      ],
      security: [
        {
          basicAuth: [],
        },
      ],
     
      responses: {
        200: {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User deleted successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "user@example.com" },
                      name: { type: "string", example: "Updated Name" },
                      age: { type: "integer", example: 25 },
                      country: { type: "string", example: "Country" },
                      mobile: { type: "string", example: "+1234567890" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "User not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "User not found" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: { type: "string", example: "Internal Server Error" },
                  error: { type: "string", example: "Error details" },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = userRoutesDocs;
