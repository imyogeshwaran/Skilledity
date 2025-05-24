import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import MovieDetails from '@/components/MovieDetails';
import { PageTransition } from '@/components/ui/page-transition';
import { fetchMovieDetails } from '@/lib/api';
import styles from '@/styles/Movie.module.css';

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1>Error loading movie details</h1>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className={styles.container}>
        <Navbar />
        {movie && <MovieDetails movie={movie} />}
      </div>
    </PageTransition>
  );
} 