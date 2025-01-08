import { NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createOpenAI  } from '@ai-sdk/openai';
import decryptApiKey from '@/app/util/decryptApiKey';
import { APIError } from '@/app/types/chat';
import { handleAPIError } from './error-handler';
export async function POST(request: Request) {
  try {
    const { encryptedKey, messages,model, temperature, maxTokens } = await request.json();

    // 암호화된 키 복호화
    const apiKey = decryptApiKey(encryptedKey);
    const openai = createOpenAI({ apiKey });

    const textStream = streamText({
        model: openai(model),
        system: model.includes('o1-') ? undefined : 'You are a helpful assistant.',
        messages,
        temperature: temperature,
        maxTokens: model.includes('o1-') ?undefined : maxTokens,
    });

    for await (const part of textStream.fullStream) {
        switch (part.type) {
          case 'error': { 
            console.log('Error:', part.error);
            return handleAPIError(part.error as APIError);
          }
        }
        return textStream.toDataStreamResponse();
    }
    
    return textStream.toDataStreamResponse();
  } catch (error) {
    return NextResponse.json(
      { error: error }, 
      { status: 500 }
    );
  }
} 