import React from "react";
import ReactPaginate from 'react-paginate';

import styles from './Pogination.module.scss'


function Pogination({ currentPage, onClickPage }) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onClickPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pogination;