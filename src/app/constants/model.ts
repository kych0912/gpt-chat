import { ModelInfo } from '@/app/types/chat';

// 모델 목록 및 설명
export const models: ModelInfo[] = [
    {
      id: 'o1',
      name: 'o1',
      description: 'Reasoning models that excel at complex, multi-step tasks'
    },
    {
      id: 'o1-mini',
      name: 'o1-mini',
      description: 'Reasoning models that excel at complex, multi-step tasks'
    },
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: 'Our versatile, high-intelligence flagship model'
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o-mini',
      description: 'Our fast, affordable small model for focused tasks'
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'The previous set of high-intelligence models'
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'The previous set of high-intelligence models'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      description: 'Fast and efficient model for most tasks'
    }
  ];