'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatMessage from '@/app/components/Chat/ChatMessage';
import { useMutation } from '@tanstack/react-query';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
`;

const InputArea = styled.form`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    ring: 2px solid #3b82f6;
  }
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #9ca3af;
  }
`;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// API 호출 함수 분리
const sendChatMessage = async (payload: { messages: Message[], apiKey: string | null }) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('응답 오류');
  }

  return response.json();
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('메시지 전송 중 오류가 발생했습니다.');
    }
  });

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatMutation.isPending) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    chatMutation.mutate({
      messages: [...messages, newMessage],
      apiKey: localStorage.getItem('gpt-api-key'),
    });
  };

  return (
    <Container>
      <ChatArea ref={chatAreaRef}>
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </ChatArea>
      <InputArea onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          disabled={chatMutation.isPending}
        />
        <SendButton type="submit" disabled={chatMutation.isPending}>
          {chatMutation.isPending ? '전송 중...' : '전송'}
        </SendButton>
      </InputArea>
    </Container>
  );
}