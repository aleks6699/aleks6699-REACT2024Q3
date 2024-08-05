import styles from './loading.module.css';
import Image from 'next/image';
import gif from '../../../public/loading.gif';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Image src={gif} alt="loading" width={100} height={100} priority />
    </div>
  );
}