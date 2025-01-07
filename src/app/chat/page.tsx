'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import ChatInterface from '@/app/components/Chat/ChatInterface';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    const apiKey = sessionStorage.getItem('encrypted-api-key');
    if (!apiKey) {
      router.push('/');
    }
  }, [router]);

  return (
    <ChatContainer>
      <ChatInterface />
    </ChatContainer>
  );
} 