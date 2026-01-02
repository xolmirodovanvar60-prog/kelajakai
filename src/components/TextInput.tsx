import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

export function TextInput({ onSubmit, isProcessing }: TextInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      onSubmit(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-6">
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Yoki yozing: Quyosh nima?"
        disabled={isProcessing}
        className="flex-1 h-12 rounded-xl text-base"
      />
      <Button
        type="submit"
        disabled={isProcessing || !inputText.trim()}
        className="h-12 px-6 rounded-xl"
      >
        <Send size={18} />
      </Button>
    </form>
  );
}
