'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import "highlight.js/styles/a11y-dark.css";
import { MessageContainer, MessageBubble } from './chat.styles';

interface ChatMessageProps {
  role: "data" | "user" | "system" | "assistant";
  content: string;
}

const ChatMessage = React.memo(({ role, content }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus as any}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </MessageBubble>
    </MessageContainer>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;