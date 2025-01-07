import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();
    
    if (!apiKey || !apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { error: 'Invalid API key format' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });
    
    // 실제 API 호출로 키 유효성 검증
    await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'h' }],
      model: 'gpt-3.5-turbo',
      max_tokens: 1 // 최소한의 토큰만 사용
    });

    return NextResponse.json({ 
      success: true,
      message: 'API key is valid' 
    });
    
  } catch (error: any) {
    // OpenAI API 에러 처리
    const errorMessage = error.response?.data?.error?.message || 'Invalid API key';
    console.log(error);
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false 
      },
      { status: 401 }
    );
  }
}
