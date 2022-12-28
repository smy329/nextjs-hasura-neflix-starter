import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion";
import cls from "classnames"

import styles from './card.module.css'

const Card = (props) => {
  const { imgUrl = "/static/ai_img.png", size = "medium", id, shouldScale = true, } = props

  const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }

  const handleOnError = () => {
    console.log("Found image source error")
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
    );
  }

  //scaling card 
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }
  
  //scaling during hover. 
  //If "shouldScale" don't passed through props, cards will get scaling animation automatically
  //As props has 'shouldScale = true'
  const shouldHover = shouldScale && {
    whileHover: {...scale}
  }
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{
          ...shouldHover,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src={imgSrc}
          alt="Card Image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
}

export default Card