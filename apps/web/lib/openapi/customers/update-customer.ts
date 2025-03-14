import { openApiErrorResponses } from "@/lib/openapi/responses";
import {
  CustomerEnrichedSchema,
  getCustomersQuerySchema,
  updateCustomerBodySchema,
} from "@/lib/zod/schemas/customers";
import { ZodOpenApiOperationObject } from "zod-openapi";

export const updateCustomer: ZodOpenApiOperationObject = {
  operationId: "updateCustomer",
  "x-speakeasy-name-override": "update",
  "x-speakeasy-max-method-params": 2,
  summary: "Update a customer",
  description: "Update a customer for the authenticated workspace.",
  requestParams: {
    path: CustomerEnrichedSchema.pick({ id: true }),
    query: getCustomersQuerySchema.pick({ includeExpandedFields: true }),
  },
  requestBody: {
    content: {
      "application/json": {
        schema: updateCustomerBodySchema,
      },
    },
  },
  responses: {
    "200": {
      description: "The customer was updated.",
      content: {
        "application/json": {
          schema: CustomerEnrichedSchema,
        },
      },
    },
    ...openApiErrorResponses,
  },
  tags: ["Customers"],
  security: [{ token: [] }],
};
