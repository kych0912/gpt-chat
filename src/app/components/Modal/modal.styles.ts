import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  text-align: center;
`;

export const Description = styled.p`
  margin-bottom: 1.25rem;
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.95rem;
  
  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    position: relative;
    
    &:hover {
      color: #1d4ed8;
      &:after {
        width: 100%;
      }
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #2563eb;
      transition: width 0.3s ease;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({theme})=>theme.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: '⚠️';
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({theme})=>theme.primary};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const InfoToggleContainer = styled.div`
  margin: 1rem 0;
  background-color: #f0f9ff;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const InfoToggleButton = styled.button`
  width: 100%;
  padding: 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #0369a1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;

  &:hover {
    background-color: #e0f2fe;
  }
`;

export const InfoContent = styled.div`
  padding: 1rem;
  background-color: #f0f9ff;
  border-top: 1px solid #e0f2fe;
  font-size: 0.85rem;

  p {
    margin: 0 0 0.5rem 0;
    font-weight: 500;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      margin: 0.5rem 0;
      color: #0c4a6e;
      font-size: 0.9rem;
    }
  }
`;

