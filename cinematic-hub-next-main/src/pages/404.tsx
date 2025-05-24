
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Skilledity</title>
        <meta name="description" content="The page you are looking for does not exist" />
      </Head>
      
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist or has been moved.</p>
          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
