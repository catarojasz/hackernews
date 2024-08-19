import React from 'react';

interface TextProps {
  tag: React.ElementType; 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ tag: Tag, children, className, style }) => (
  <Tag className={className} style={style}>
    {children}
  </Tag>
);

export default Text;