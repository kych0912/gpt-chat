import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

export const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
`;

export const InputArea = styled.form`
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
`;

export const Textarea = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  font-size: 0.875rem;
  resize: none;
  min-height: 20px;
  max-height: 200px;
  height: auto;
  overflow-y: auto;
  line-height: 1.5;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
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

export const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.$isUser ? '#3b82f6' : '#ffffff'};
  color: ${props => props.$isUser ? '#ffffff' : '#000000'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  // 마크다운 스타일링
  h1, h2, h3, h4, h5, h6 {
    margin: 0.5rem 0;
    font-weight: 600;
  }

  h1 { font-size: 1.5em; }
  h2 { font-size: 1.3em; }
  h3 { font-size: 1.1em; }

  p {
    margin: 0.5rem 0;
  }

  strong {
    font-weight: 600;
    color: ${props => props.$isUser ? '#ffffff' : '#000000'};
  }

  em {
    font-style: italic;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    list-style-type: decimal;
  }

  ol ol {
    list-style-type: lower-alpha;
  }

  ol ol ol {
    list-style-type: lower-roman;
  }

  li {
    margin: 0.25rem 0;
    display: list-item;
  }

  blockquote {
    margin: 0.5rem 0;
    padding-left: 1rem;
    border-left: 3px solid ${props => props.$isUser ? '#ffffff' : '#3b82f6'};
    font-style: italic;
  }

  pre {
    margin: 0.5rem 0;
    padding: 0;
    background: none !important;
  }

  a {
    color: ${props => props.$isUser ? '#ffffff' : '#3b82f6'};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }

  table {
    border-collapse: collapse;
    margin: 0.5rem 0;
    width: 100%;
  }

  th, td {
    border: 1px solid ${props => props.$isUser ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'};
    padding: 0.4rem;
    text-align: left;
  }

  th {
    background-color: ${props => props.$isUser ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const SettingsButton = styled.button`
  padding: 0.5rem;
  margin-left: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  border-radius: 0.375rem;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;


// 스타일 컴포넌트 업데이트
export const ModelSelectContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

export const ModelSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  width: 160px;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
`;