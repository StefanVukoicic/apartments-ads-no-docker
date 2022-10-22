import { FC } from "react";
import { Card } from "../Card";
import styles from "./CardList.module.scss";

export interface AdObject {
  ad_title: string;
  ad_image_url: string;
  id: number;
}

interface CardListProps {
  listOfAds: AdObject[];
}

//COMPONENT TO LOOP THROUGH AN ARRAY AND PLACE CARDS IN A GRID
export const CardList: FC<CardListProps> = ({ listOfAds }: CardListProps) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.cardList}>
        {listOfAds.map((ad) => {
          return (
            <Card title={ad.ad_title} imageUrl={ad.ad_image_url} key={ad.id} />
          );
        })}
      </div>
    </div>
  );
};
