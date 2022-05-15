import Image from 'next/image';

import styles from './card.module.css';
import cls from 'classnames';

import { useState } from 'react';
import { motion } from 'framer-motion';

const Card = (props) => {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80',
    size = 'medium',
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const handleError = () => {
    console.log('Error occured');
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80'
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(classMap[size], styles.imgMotionWrapper)}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={imgSrc}
          className={styles.cardImg}
          alt='image'
          layout='fill'
          onError={handleError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
