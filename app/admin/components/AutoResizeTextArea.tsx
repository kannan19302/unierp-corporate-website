'use client';

import React, { useRef, useEffect } from 'react';

interface AutoResizeTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
}

export function AutoResizeTextArea({
  value,
  onChange,
  style,
  minRows = 2,
  ...props
}: AutoResizeTextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.max(el.scrollHeight + 2, minRows * 24)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => {
        adjustHeight();
        onChange?.(e);
      }}
      style={{
        overflow: 'hidden',
        resize: 'none',
        transition: 'height 0.15s ease',
        ...style,
      }}
      {...props}
    />
  );
}
