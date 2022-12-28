import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./banner.module.css";

const Banner = (props) => {
  const { videoId, title, subtitle, imgUrl } = props;
  const router = useRouter()

  const handleOnPlay = () => {
    console.log("Handle On Play");
    router.push(`video/${videoId}`)
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subtitle}</h3>
          <div className={styles.buttonWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="play button icon"
                width="32" //in pixel
                height="32" //in pixel
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
