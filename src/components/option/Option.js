import React from 'react';
import styles from './style.module.scss'
import cx from 'classnames'

const Option = ({ selected = false, onClick, option, showResult = false }) => {

    const className = cx(styles.option, {
        [styles.selected]: selected,
        [styles.success]: showResult && option.correct,
        [styles.failed]: showResult && selected && !option.correct,
    });

    return(<div
        className={className}
        onClick={() => onClick(option)}
    >
        <img src={option.img} alt="" className={styles.img}/>
    </div>)
};

export default Option;