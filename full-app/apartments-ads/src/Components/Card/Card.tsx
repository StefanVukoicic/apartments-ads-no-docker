import { FC } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  imageUrl: string;
  className?: string;
}
// SIMPLE CARD COMPONENT TAKING IN PROPS AND DISPLAYING THEM
export const Card: FC<CardProps> = ({
  title,
  imageUrl,
  className,
}: CardProps) => {
  return (
    <div className={classNames(styles.cardContainer, className)}>
      <div className={styles.cardImageContainer}>
        <img src={imageUrl} alt="apartment" className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};
