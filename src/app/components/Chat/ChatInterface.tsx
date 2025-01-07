'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ChatMessage from '@/app/components/Chat/ChatMessage';
import { useChat } from 'ai/react';
import { Model } from '@/app/types/chat';
import { models } from '@/app/constants/model';
import * as S from './chat.styles';
import SettingsModal from './SettingsModal';
import { ModelSelectContainer, ModelSelect, SelectArrow } from './chat.styles';
import { useCustomChat } from '@/app/hooks/useCustomChat';
import { useScrollToBottom } from '@/app/hooks/useScrollToBottom';

export default function ChatInterface() {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollToBottom = useScrollToBottom(chatAreaRef);
  const [model, setModel] = useState<Model>('gpt-3.5-turbo');
  const encryptedKey = typeof window !== 'undefined' ? sessionStorage.getItem('encrypted-api-key') : null;
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);

  const {
    messages,
    input,
    setInput,
    isLoading,
    append,
    stop
  } = useCustomChat({
    encryptedKey,
    model,
    temperature,
    maxTokens
  });


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input.length === 0){
      return;
    }

    append({
      role: 'user',
      content: input
    })

    setInput('');
    inputRef.current?.focus();
  }   

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        append({
          role: 'user',
          content: input
        });
        setInput('');
        inputRef.current?.focus();
      }
    }
  };

  // textarea 높이 자동 조절
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  useEffect(() => {
    scrollToBottom();
  }, [isLoading]);

  return (
    <S.Container>
      <S.Header>
        <ModelSelectContainer>
          <ModelSelect
            value={model}
            onChange={(e) => setModel(e.target.value as Model)}
            disabled={isLoading}
            title={models.find(m => m.id === model)?.description}
          >
            {models.map((model) => (
              <option 
                key={model.id} 
                value={model.id}
                title={model.description}
              >
                {model.name}
              </option>
            ))}
          </ModelSelect>
          <SelectArrow>▼</SelectArrow>
        </ModelSelectContainer>
        <S.SettingsButton onClick={() => setIsSettingsOpen(true)}>
          <div>
            설정
          </div>
        </S.SettingsButton>
      </S.Header>
      <S.ChatArea ref={chatAreaRef}>
        <>
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {
            isLoading && (
              <div>
                loading...
              </div>
            )
          }
        </>
      </S.ChatArea>
      <S.InputArea onSubmit={handleSubmit}>
        <S.Textarea
          ref={inputRef}
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
        />
        <S.SendButton type="submit" 
        onClick={()=>{
          if(isLoading){
            stop();
          }
        }}>
          {isLoading ? '중지' : '전송'}
        </S.SendButton>
      </S.InputArea>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        temperature={temperature}
        maxTokens={maxTokens}
        onSave={(newTemp, newMaxTokens) => {
          setTemperature(newTemp);
          setMaxTokens(newMaxTokens);
        }}
      />
    </S.Container>
  );
}