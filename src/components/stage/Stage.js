import React from 'react';
import styles from './style.module.scss'

import * as moment from 'moment';
import 'moment-duration-format';

import Finger from "../finger/Finger";
import Option from "../option/Option";
const Stage = ({time, fingerImage, options, selectedOptions, started, showResults, onOptionClick, onResetClick, onCheckClick }) => {

    const parsedTime = moment.duration(time, "seconds").format("mm:ss", {
        forceLength: true,
        trim: false,
    });

    console.log(parsedTime)

    return(<div className={styles.container}>

        <div>
            <div className={styles.options}>
                {!!options && options.map((option, key) =>  <Option
                    key={key}
                    option={option}
                    selected={selectedOptions.includes(option)}
                    onClick={onOptionClick}
                    showResult={showResults}
                />)}
            </div>

            <div className={styles.buttons}>
                <div className={styles.button} onClick={onCheckClick} data-disabled={selectedOptions.length !== 4}>CHECK</div>
                <div className={styles.button} onClick={onResetClick}>{started ? "RESET" : "START"}</div>
            </div>


        </div>

        <div className={styles.rightColumn}>
            <div className={styles.time}>{parsedTime}</div>
            <Finger image={fingerImage}/>
        </div>



    </div>)
};

export default Stage;