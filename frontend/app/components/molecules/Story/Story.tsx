import React from 'react';
import { useState } from 'react';
import Text from '../../atoms/Text'
import styles from './Story.module.css';
import DateFormat from '../../atoms/DateFormat';
import TrashButton from '../../atoms/TrashButton';

interface StoryProps {
    story_id: number;
    title: string;
    link: string;
    author: string;
    created: number;
    onNoShow: (id: number) => void;
}

const Story: React.FC<StoryProps> = ({ story_id, title, author, link, created, onNoShow}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleNoShowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const noShowTime = Date.now();

        try {
            const response = await fetch(`http://localhost:3000/stories/${story_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noShow: noShowTime,
                }),
            });

            if (!response.ok) {
                throw new Error('Cannot update');
            }
        } catch (error) {
            console.error("Cannot Update:", error);
        }
        onNoShow(story_id);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); 
        window.location.href = link;
    }

    return (
        <div className={styles['story-container']} 
            onClick={handleLinkClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: isHovered ? '#fafafa' : '#fff' }}>

            <Text className={styles['story-title']} name={title}/>
            <Text className={styles['story-author']} name={author}></Text>
            <DateFormat className={styles['story-date']} epoch={created}></DateFormat>
            {isHovered && <TrashButton onClick={handleNoShowClick} className={styles['story-button']} />}
        </div>
    )
}

export default Story;