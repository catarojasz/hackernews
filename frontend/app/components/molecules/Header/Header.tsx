import React from 'react';
import Text from '../../atoms/TagText';
import styles from './Header.module.css';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {
    return (
        <div className={styles['header-container']}>
            <Text tag="h1" className={styles['header-title']}>{title}</Text>
            <Text tag="h4" className={styles['header-subtitle']}>{subtitle}</Text>
        </div>
    )
}

export default Header;