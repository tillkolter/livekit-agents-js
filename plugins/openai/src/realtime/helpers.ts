import type { llm } from '@livekit/agents';
import { zodResponseFormat } from 'openai/helpers/zod';
import type { Tool } from './api_proto';

export const translateCallableFunctionToTool = (name: string, func: llm.CallableFunction): Tool => {
  const paramSchema = zodResponseFormat(func.parameters, 'formaa').json_schema.schema;

  return {
    type: 'function' as const,
    name,
    description: func.description,
    ...(paramSchema ? { parameters: paramSchema } : {}),
  };
};
