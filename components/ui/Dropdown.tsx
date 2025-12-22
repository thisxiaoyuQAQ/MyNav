import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  align?: 'left' | 'right';
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = '请选择',
  className,
  align = 'left',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    setPortalContainer(document.body);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  if (!portalContainer) return null;

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="glass-button w-full justify-between min-w-[140px]"
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon}
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <div
            className={cn(
              'fixed glass-card z-50 max-h-64 overflow-y-auto',
              align === 'right' ? '-translate-x-full' : '',
              'mt-1'
            )}
            style={{
              top: dropdownRef.current?.getBoundingClientRect().bottom,
              left:
                align === 'right'
                  ? dropdownRef.current?.getBoundingClientRect().right
                  : dropdownRef.current?.getBoundingClientRect().left,
              width: dropdownRef.current?.offsetWidth,
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={cn(
                  'w-full text-left context-menu-item',
                  option.value === value && 'bg-accent text-accent-foreground'
                )}
              >
                <span className="flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </span>
              </button>
            ))}
          </div>,
          portalContainer
        )}
    </div>
  );
}
