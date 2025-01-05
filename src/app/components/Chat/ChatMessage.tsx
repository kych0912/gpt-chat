'use client';

import styled from 'styled-components';

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.$isUser ? '#3b82f6' : '#ffffff'};
  color: ${props => props.$isUser ? '#ffffff' : '#000000'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

type ChatMessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  
  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>
        {content}
      </MessageBubble>
    </MessageContainer>
  );
}