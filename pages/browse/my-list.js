import Head from "next/head";
import SectionCards from "../../components/card/section-cards";
import Navbar from "../../components/nav/navbar";

import styles from "../../styles/MyList.module.css";
import { redirectUser } from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";



export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  //we are checking token here. If we don't find token, use will be redirected to login page
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
    const videos = await getMyList(userId, token);
    
    return {
        props: {
            myListVideos: videos,
        },
    }
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My-List</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale = {false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;