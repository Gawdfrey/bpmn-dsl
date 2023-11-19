import { Gateway } from "./gateways/index.ts";
import { Task } from "./tasks/index.ts";

export class SequenceFlow {
  from: Task | Event | Gateway;
  to: Task | Event | Gateway;
  condition?: (variables: any) => boolean;

  constructor(
    from: Task | Event | Gateway,
    to: Task | Event | Gateway,
    condition?: (variables: any) => boolean
  ) {
    this.from = from;
    this.to = to;
    this.condition = condition;
  }

  isConditionMet(variables: any): boolean {
    if (this.condition) {
      return this.condition(variables);
    }

    return true;
  }
}
