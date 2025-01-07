import { NextResponse } from 'next/server';
import { APIError } from '@/app/types/chat';

export type APIErrorCode = 
  | 'model_not_found'
  | 'rate_limit_exceeded'
  | 'context_length_exceeded'
  | 'content_filter'
  | 'unknown_error';

export interface ErrorResponse {
  message: string;
  code: APIErrorCode;
}

export function handleAPIError(error: APIError): Response {
  if (!error) {
    return new Response(
      JSON.stringify({ message: "Chat failed" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const errorMessage = error.data.error || "Chat failed";
  
  switch(errorMessage.message){
    case 'The model `o1` does not exist or you do not have access to it.':
        return NextResponse.json(   
            { error: "o1 또는 해당 모델에 접근할 수 없습니다." }, 
            { status: 500 }
        );
    case 'rate_limit_exceeded':
        return NextResponse.json(   
            { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, 
            { status: 500 }
        );  
    case 'context_length_exceeded':
        return NextResponse.json(   
            { error: "대화가 너무 길어졌습니다. 새로운 대화를 시작해주세요." }, 
            { status: 500 }
        );
    case 'content_filter':
        return NextResponse.json(   
            { error: "부적절한 내용이 감지되었습니다." }, 
            { status: 500 }
        );
            
    default:
        return NextResponse.json(   
            { error: `에러가 발생했습니다.` }, 
            { status: 500 }
        );
  }
}
