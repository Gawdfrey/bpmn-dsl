import { SequenceFlow } from "./sequence-flow.ts";
import { Task } from "./tasks/index.ts";
import { Event } from "./events/index.ts";
import { Gateway } from "./gateways/index.ts";
import { UserTask } from "./tasks/user-task.ts";
import { ServiceTask } from "./tasks/service-task.ts";
import { StartEvent } from "./events/start-event.ts";
import { EndEvent } from "./events/end-event.ts";
import { ParallelGateway } from "./gateways/parallell-gateway.ts";
import { ExclusiveGateway } from "./gateways/exclusive-gateway.ts";
import jsonpatch, { Operation } from "https://esm.sh/fast-json-patch@3.1.1";

export class Process<T, U> {
  private lastNode: Event | Task | Gateway | null = null;
  private tasks: Task[] = [];
  private events: Event[] = [];
  private sequenceFlows: SequenceFlow[] = [];
  private gateways: Gateway[] = [];
  private variables: any = {};
  private state: any = {};

  applyPatch(patch: Array<Operation>): Process<T, U> {
    this.state = jsonpatch.applyPatch(this.state, patch).newDocument;
    return this;
  }

  private addNode(node: Task | Event | Gateway): Process<T, U> {
    if (this.lastNode) {
      this.sequenceFlows.push(new SequenceFlow(this.lastNode, node));
    }
    this.lastNode = node;

    return this;
  }

  userTask(name: string): Process<T, U> {
    const task = new UserTask(name);
    this.tasks.push(task);
    return this.addNode(task);
  }

  serviceTask(name: string): Process<T, U> {
    const task = new ServiceTask(name);
    this.tasks.push(task);
    return this.addNode(task);
  }

  messageTask(name: string): Process<T, U> {
    const task = new ServiceTask(name);
    this.tasks.push(task);
    return this.addNode(task);
  }

  startEvent(event: StartEvent<T, U>): Process<T, U> {
    this.events.push(event);

    event.validate({ input: event.input }).then((result) => {
      if (!result.valid) {
        throw new Error(result.message);
      }
    });

    return this.addNode(event);
  }

  endEvent(name: string): Process<T, U> {
    const event = new EndEvent(name);
    this.events.push(event);
    return this.addNode(event);
  }

  parallelGateway(name: string): Process<T, U> {
    const gateway = new ParallelGateway(name);
    this.gateways.push(gateway);
    return this.addNode(gateway);
  }

  exclusiveGateway(
    sequenceFlows: Array<{
      condition: (variables: T) => boolean;
      to: Event | Task | Gateway;
    }>
  ): Process<T, U> {
    const gateway = new ExclusiveGateway(name, sequenceFlows);
    this.gateways.push(gateway);
    return this.addNode(gateway);
  }
}
