import React from "react";
import { format, formatDistanceToNow, isToday, isValid, isYesterday } from 'date-fns';

interface DateFormatProps {
    created: number;
    className?: string;
}

const DateFormat: React.FC<DateFormatProps> = ({ created, className }) => {
    
    const date = created;
    console.log(date)
    let dateText;
    if (isValid(date)) {
        if (isToday(date)) {
            dateText = format(date,'HH:mm');
    
        } else if (isYesterday(date)) {
            dateText = 'Yesterday';
    
        } else {
            dateText = format(date, 'd MMMM yyyy');
        }
    } else {
        console.error('La fecha proporcionada es inválida:', date);
        dateText = 'Fecha inválida';
    }

    return (
        <span style={{color: '333333'}}>{ dateText }</span>
    )
};

export default DateFormat;