import React, { useEffect, useState } from 'react';
import Story from '../molecules/Story/Story';

interface StoryData {
    story_id: number;
    title: string;
    link: string;
    author: string;
    created: number;
}

const StoriesContainer: React.FC = () => {

    const [stories, setStories] = useState<StoryData[]>([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:3000/stories');
                const data: StoryData[] = await response.json();
                console.log(data);
                setStories(data);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };

        fetchStories();
    }, []);

    const handleStoryNoShow = (id: number) => {
        setStories(prevStories => prevStories.filter(story => story.story_id !== id));
    };
    return (
        <div>
            {stories.map(story => (
                <Story key={story.story_id} {...story} onNoShow={handleStoryNoShow} />
            ))}
        </div>
    );
};

export default StoriesContainer;