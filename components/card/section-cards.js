import Card from './card';

import styles from './section-cards.module.css';

const SectionCards = (props) => {
  const { title, videos = [], size } = props;

  //   const sizeMap = {
  //     'TV Shows': 'large',
  //     'Watch it again': 'medium',
  //     Popular: 'small',
  //   };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return <Card key={idx} imgUrl={video.imgUrl} size={size} />;
        })}
      </div>
    </section>
  );
};

export default SectionCards;
