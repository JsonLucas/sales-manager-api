import { port } from "../../utils/env";

export const swaggerOptions = {
  openapi: "3.0.3",
  info: {
    title: "Sales Manager",
    version: "1.0.0",
    description: "escrever alguma descrição aqui",
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],
  apis: ["../*/*.ts"],
  components: {
    schemas: {
      auth: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      employee: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          positionid: { type: "number" },
          createdAt: { type: "date", example: "2022-12-20T23:22:39.296Z" },
          updatedAt: { type: "date", example: "2022-12-20T23:22:39.296Z" },
        },
      },
      login: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      sales: {
        type: "object",
        properties: {
          id: { type: "number" },
          saleDate: { type: "date", example: "2022-12-20T23:22:39.296Z" },
          value: { type: "number" },
          roamingSale: { type: "boolean" },
          coordinates: { type: "string" },
          employee: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
          unity: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
        },
      },
      unitiesData: {
        id: { type: "number" },
        name: { type: "string" },
        coordinates: {
          type: "string",
          example: "-30.048750057541955, -51.228587422990806",
        },
        employee: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        board: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
        totalEarning: { type: "number" },
      },
      createSale: {
        type: "object",
        properties: {
          value: { type: "number" },
          coordinates: {
            type: "string",
            example: "-19.917854829716372, -43.94089385954766",
          },
          saleDate: { type: "date", example: "2022-12-20T23:22:39.296Z" },
          unityName: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/signin": {
      post: {
        tags: ["Sign employee action"],
        description: "App login",
        operationId: "login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/login",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Successful seller login",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/auth",
                },
              },
            },
          },
          401: {
            description: "incorrect employee credentials",
          },
          404: {
            description: "Employee not found",
          },
          422: {
            description: "Incorrect schema format",
          },
        },
      },
    },
    "/sales": {
      get: {
        tags: ["Get sales"],
        description: "Get sales based on hierarchy: 'Diretor Geral' > 'Diretor' > 'Gerente' > 'Vendedor'",
        operationId: "get-sales",
        responses: {
          200: {
            description: "sales response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/sales",
                  },
                },
              },
            },
          },
        },
      },
	  post: {
        tags: ["Create Sale"],
        description: "Create a new sale register.",
        operationId: "create-sale",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/createSale",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Successfully created.",
          },
		  401: {
			description: 'Unauthorized to finish this action.'
		  }, 
		  404: {
			description: 'Employee or unity not found.'
		  },
		  422: {
			description: 'Invalid schema format.'
		  }
        },
      },
    },
    "/sales/{id}": {
      get: {
        tags: ["Get sales"],
        description: "Get a single sale by identifier.",
        operationId: "get-sale",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "number" },
            example: 1,
          },
        ],
        responses: {
          200: {
            description: "Sale response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/sales",
                },
              },
            },
          },
          401: {
            description: "Unauthorized to access the content.",
          },
          404: {
            description: "Sale not found.",
          },
        },
      },
    },
  },
};
