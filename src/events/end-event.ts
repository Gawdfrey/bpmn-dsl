import { Event } from "./index.ts";

export class EndEvent extends Event {
  constructor(name: string) {
    super(name);
  }
}
