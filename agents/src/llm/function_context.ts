// SPDX-FileCopyrightText: 2024 LiveKit, Inc.
//
// SPDX-License-Identifier: Apache-2.0
import type { z } from 'zod';

// heavily inspired by Vercel AI's `tool()`:
// https://github.com/vercel/ai/blob/3b0983b/packages/ai/core/tool/tool.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Type reinforcement for the callable function's execute parameters. */
export type inferParameters<P extends z.ZodTypeAny> = z.infer<P>;

/** A definition for a function callable by the LLM. */
export interface CallableFunction<P extends z.ZodTypeAny = any, R = any> {
  description: string;
  parameters: P;
  execute: (args: inferParameters<P>) => PromiseLike<R>;
}

/** An object containing callable functions and their names */
export type FunctionContext = {
  [name: string]: CallableFunction;
};
