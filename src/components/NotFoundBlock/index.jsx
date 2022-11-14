import React from "react";
import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {

    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению данная странница отсутствует в нашем инитернет-магазине</p>
        </div>

    )
}

export default NotFoundBlock;