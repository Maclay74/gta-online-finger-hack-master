import React from 'react';
import styles from './style.module.scss'

const Finger = ({ image }) => {

    return(<div className={styles.container}>
        <img src={image} alt=""/>
    </div>)
};

export default Finger;