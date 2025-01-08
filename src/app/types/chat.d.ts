// 모델 타입 정의 업데이트
export type Model = 
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'o1-preview'
  | 'o1'
  | 'o1-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo';

// 모델 정보 타입
export interface ModelInfo {
  id: Model;
  name: string;
  description: string;
}

export type Message = {
    role: 'user' | 'assistant';
    content: string;
  };
  
  
export type APIError = {
  data: {
    error: {
      message: string;
      type: string;
      param: string | null;
      code: string;
    }
  }
};