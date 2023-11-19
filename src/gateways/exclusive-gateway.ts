import { Task } from "../tasks/index.ts";
import { Event } from "../events/index.ts";
import { Gateway } from "./index.ts";

export class ExclusiveGateway extends Gateway {
  private sequenceFlows: Array<{
    condition: (context: any) => boolean;
    to: Event | Task | Gateway;
  }>;

  constructor(
    name: string,
    sequenceFlows: Array<{
      condition: (context: any) => boolean;
      to: Event | Task | Gateway;
    }>
  ) {
    super(name);
    this.sequenceFlows = sequenceFlows;
  }
}
