import React from 'react';
import { FaTrash } from 'react-icons/fa';

interface TrashButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string; 
    ariaLabel?: string;
}

const TrashButton: React.FC<TrashButtonProps> = ({
    onClick,
    className,
    ariaLabel = 'Delete',
}) => {
    return (
        <button onClick={onClick} className={className} aria-label={ariaLabel}>
            <FaTrash color='black'/>
        </button>
  );
};

export default TrashButton;