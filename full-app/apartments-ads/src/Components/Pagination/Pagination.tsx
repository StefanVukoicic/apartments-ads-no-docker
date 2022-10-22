import classNames from "classnames";
import { FC } from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  //EMPTY ARRAY FOR PAGE NUMBERS
  let pages = [];

  //LOOPS FROM 1 TO MAX NEEDED PAGES AND PUSHES EACH ELEMENT INTO AN ARRAY
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  //COMPONENT MAPS PAGES ARRAY AND DISPLAYS PAGE NUMBERS AS BUTTONS THAT SET THE ACTIVE PAGE
  return (
    <div className={styles.flexContainer}>
      <div className={styles.paginationContainer}>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={classNames(page === currentPage ? styles.active : "")}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};
