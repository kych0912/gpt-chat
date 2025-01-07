import { useChat as useVercelChat } from 'ai/react';


interface ChatConfig {
  encryptedKey: string | null;
  model: string;
  temperature: number;
  maxTokens: number;
}

export function useCustomChat(config: ChatConfig) {
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    append,
    stop
  } = useVercelChat({
    api: '/api/chat',
    body: {
      encryptedKey: config.encryptedKey,
      model: config.model,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    },
    onError: (error: Error) => {
        const errorObj = JSON.parse(error.message);
        alert(errorObj.error);
        setMessages(prev=>[...prev.slice(0,-1)])
      },  
  });

  return {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    append,
    stop
  };
} 