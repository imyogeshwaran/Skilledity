import { useRouter } from 'next/router';
import { Calendar, Star, TrendingUp } from 'lucide-react';
import Pagination from './Pagination';
import { formatDate } from '@/lib/utils';
import styles from '@/styles/MovieSection.module.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  type: 'upcoming' | 'latest' | 'popular' | 'topRated';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MovieSection({ 
  title, 
  movies, 
  type, 
  currentPage, 
  totalPages, 
  onPageChange 
}: MovieSectionProps) {
  const router = useRouter();
  
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider}></div>
      
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
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
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <h3>{movie.title}</h3>
                  <p>{movie.overview?.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
            <div className={styles.meta}>
              {type === 'upcoming' && <><Calendar size={14} /> {movie.release_date && formatDate(movie.release_date)}</>}
              {type === 'topRated' && <><Star size={14} /> {movie.vote_average}</>}
              {type === 'popular' && <><TrendingUp size={14} /> {movie.popularity}</>}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.min(totalPages, 20)}
        onPageChange={onPageChange}
      />
    </div>
  );
}
