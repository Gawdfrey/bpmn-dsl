import { StartEvent } from "../../src/events/start-event.ts";

export const start = new StartEvent(
  { amount: 1000 },
  { name: "John Doe" },
  {
    flowId: crypto.randomUUID(),
    taskId: crypto.randomUUID(),
    versionTag: null,
  },
  "start loan process"
);

start.execute = async ({ input, user }) => {
  input.amount = input.amount + 100;
  return input;
};

start.validate = async ({ input }) => {
  if (input.amount < 1000) {
    return {
      valid: false,
      message: "Amount must be greater than 1000",
      errors: [{ message: "Amount must be greater than 1000", errorCode: "1" }],
    };
  }
  return {
    valid: true,
    message: "",
    errors: [],
  };
};

start.generateMetadata = async ({ input }) => {
  return {
    referenceId: input.amount.toString(),
    referenceName: "amount",
  };
};

start.map = async (data) => {
  data.amount = data.amount + 100;
  return {
    patch: [
      {
        op: "add",
        path: "/test",
        value: data.amount,
      },
    ],
    variables: {},
  };
};
