'use client';

import { useState } from 'react';
import styled from 'styled-components';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  temperature: number;
  maxTokens: number;
  onSave: (temperature: number, maxTokens: number) => void;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Setting = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Value = styled.span`
  margin-left: 1rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  accent-color: ${({theme})=>theme.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  
  ${({ theme, $primary }) => $primary ? `
    background-color: ${theme.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: #2563eb;
    }
  ` : `
    background-color: white;
    color: #374151;
    border: 1px solid #d1d5db;
    
    &:hover {
      background-color: #f3f4f6;
    }
  `}
`;

export default function SettingsModal({
  isOpen,
  onClose,
  temperature,
  maxTokens,
  onSave,
}: SettingsModalProps) {
  const [tempTemperature, setTempTemperature] = useState(temperature);
  const [tempMaxTokens, setTempMaxTokens] = useState(maxTokens);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(tempTemperature, tempMaxTokens);
    onClose();
  };

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Chat Settings</Title>
        
        <Setting>
          <Label>
            Temperature <Value>{tempTemperature}</Value>
          </Label>
          <Input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={tempTemperature}
            onChange={e => setTempTemperature(Number(e.target.value))}
          />
          <div style={{fontSize:'1rem'}}>
            AI의 응답 창의성 수준을 설정합니다.
            <br/>
            (0:객관적 ~ 2:창의적)
          </div>
        </Setting>

        <Setting>
          <Label>
            Max Tokens <Value>{tempMaxTokens}</Value>
          </Label>
          <Input
            type="range"
            min="100"
            max="4000"
            step="100"
            value={tempMaxTokens}
            onChange={e => setTempMaxTokens(Number(e.target.value))}
          />
          <div>AI가 응답하는 토큰 수를 제한합니다.</div>
        </Setting>

        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button $primary onClick={handleSave}>Save</Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
} 