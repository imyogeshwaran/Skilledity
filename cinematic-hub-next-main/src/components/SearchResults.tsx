import { useRouter } from 'next/router';
import { X } from 'lucide-react';
import styles from '@/styles/SearchResults.module.css';

interface SearchResultsProps {
  results: {
    results: Array<{
      id: number;
      title: string;
      poster_path: string;
      overview: string;
      release_date: string;
      vote_average: number;
    }>;
    total_results: number;
  };
  query: string;
  onClear: () => void;
}

export default function SearchResults({ results, query, onClear }: SearchResultsProps) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Search Results for "{query}"</h2>
        <button onClick={onClear} className={styles.clearButton}>
          <X size={20} />
          Clear Search
        </button>
      </div>
      
      <p className={styles.resultsCount}>
        Found {results.total_results} results
      </p>

      <div className={styles.grid}>
        {results.results.map((movie) => (
          <div 
            key={movie.id} 
            className={styles.movieCard}
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            <div className={styles.posterContainer}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
              )}
            </div>
            <div className={styles.info}>
              <h3>{movie.title}</h3>
              <p>{movie.overview?.slice(0, 100)}...</p>
              <div className={styles.meta}>
                <span>{movie.release_date?.split('-')[0]}</span>
                <span>★ {movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
