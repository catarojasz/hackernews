import React from 'react';

interface TextProps {
    name: string;
    className?: string;
    style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ name, className, style }) => {
    return (
        <p className={className} style={style}>
            {name}
        </p>
    );
};

export default Text;
