import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';

type CustomDropdownProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function CustomDropdown({ value, options, onChange }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full text-left">
          {options.find(option => option.value === value)?.label || 'Select an option'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg">
        {options.map(option => (
          <div
            key={option.value}
            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => {
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}