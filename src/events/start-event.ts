import { Operation } from "https://esm.sh/v133/fast-json-patch@3.1.1/index.js";
import { Event } from "./index.ts";

interface Meta {
  flowId: string;
  taskId: string;
  versionTag: string | null;
}

export class StartEvent<T, U> extends Event {
  input: T;
  user: U;
  meta: Meta;

  execute = async ({
    user,
    input,
    meta,
  }: {
    user: U;
    input: T;
    meta: Meta;
  }) => {
    return {
      ...input,
    };
  };
  validate: ({ input }: { input: T }) => Promise<{
    valid: boolean;
    message: string;
    errors: Array<{ message: string; errorCode: string }>;
  }> = async () => {
    return {
      valid: true,
      message: "",
      errors: [],
    };
  };
  map: (data: Awaited<ReturnType<StartEvent<T, U>["execute"]>>) => Promise<{
    patch: Array<Operation>;
    variables: any;
  }> = async () => {
    return {
      patch: [],
      variables: {},
    };
  };
  generateMetadata: ({
    input,
    processDefinitionId,
    flowNumber,
    flowId,
    user,
  }: {
    input: T;
    processDefinitionId: string;
    flowNumber: number;
    flowId: string;
    user: U;
  }) => Promise<{
    referenceId: string;
    referenceName: string;
  }> = async () => {
    return {
      referenceId: "",
      referenceName: "",
    };
  };

  constructor(input: T, user: U, meta: Meta, name: string) {
    super(name);
    this.input = input;
    this.user = user;
    this.meta = meta;
  }
}
