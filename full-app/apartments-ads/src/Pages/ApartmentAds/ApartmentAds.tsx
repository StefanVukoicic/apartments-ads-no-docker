import { useMemo, useState } from "react";
import { AdObject, CardList } from "../../Components/CardList";
import { Pagination } from "../../Components/Pagination";
import { trpc } from "../../trpc";

import styles from "./ApartmentAds.module.scss";

export const ApartmentAds: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dbData = trpc.useQuery(["database"]);

  const databaseData = useMemo<AdObject[]>(() => {
    const placeholderArray = [
      {
        ad_title: "Loading...",
        ad_image_url: "https://picsum.photos/749/562",
        id: 1,
      },
    ];
    if (!dbData.data) {
      return placeholderArray;
    } else {
      return dbData.data;
    }
  }, [dbData]);

  const postsPerPage = 20;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentAds = databaseData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className={styles.mainContainer}>
      <CardList listOfAds={currentAds} />
      <Pagination
        totalPosts={databaseData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

// const mockData = [
//   {
//     id: 1,
//     ad_title: "Buy this cool house",
//     ad_image_url:
//       "https://d18-a.sdn.cz/d_18/c_img_gU_n/A8ABkXS.jpeg?fl=res,749,562,3|shr,,20|jpg,90",
//   },
//   {
//     id: 2,
//     ad_title: "Buy this cool house",
//     ad_image_url:
//       "https://d18-a.sdn.cz/d_18/c_img_gU_n/A8ABkXS.jpeg?fl=res,749,562,3|shr,,20|jpg,90",
//   },
//   {
//     id: 3,
//     ad_title: "Buy this cool house",
//     ad_image_url:
//       "https://d18-a.sdn.cz/d_18/c_img_gU_n/A8ABkXS.jpeg?fl=res,749,562,3|shr,,20|jpg,90",
//   },
// ];
