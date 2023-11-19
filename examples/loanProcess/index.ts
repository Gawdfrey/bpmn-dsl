import { Process } from "../../src/process.ts";
import { start } from "./start.ts";

const loanProcess = new Process<{ amount: number }, { name: string }>()
  .startEvent(start)
  .applyPatch([
    {
      op: "add",
      path: "/test",
      value: "hello",
    },
  ])
  .exclusiveGateway([
    {
      condition: (variables) => {
        return variables.amount > 1000;
      },
      to: start,
    },
    {
      condition: (variables) => {
        return variables.amount < 1000;
      },
      to: start,
    },
  ]);

console.log(loanProcess);
