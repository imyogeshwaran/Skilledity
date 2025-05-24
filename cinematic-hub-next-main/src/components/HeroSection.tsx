import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import Image from 'next/image';
import styles from '@/styles/HeroSection.module.css';

export default function HeroSection() {
  const router = useRouter();
  const { data: popularMovies } = useQuery({
    queryKey: ['hero-popular'],
    queryFn: () =>
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=db75be3f6da59e6c54d0b9f568d19d16')
        .then(res => res.json()),
  });

  if (!popularMovies || !popularMovies.results || popularMovies.results.length === 0) {
    return (
      <section className={styles.hero}>
        <div className={styles.backgroundGrid}>
          {/* Fallback posters */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className={styles.backgroundPoster}>
              <Image
                src="/placeholder.svg" // Updated to use a valid placeholder image
                alt="Fallback Poster"
                fill
                style={{ objectFit: 'cover' }}
                priority={true}
              />
            </div>
          ))}
        </div>
        <div className={styles.heroContent}>
          <h1>Welcome to Skilledity</h1>
          <p>Discover and watch your favorite movies and shows anytime, anywhere.</p>
          <button className={styles.watchButton}>
            <Play className={styles.playIcon} />
            Explore Now
          </button>
        </div>
      </section>
    );
  }

  const mainMovie = popularMovies.results[0];

  return (
    <section className={styles.hero}>
      {/* Movie posters grid */}
      <div className={styles.backgroundGrid}>
        {popularMovies?.results?.slice(0, 12).map((movie) => (
          <div key={movie.id} className={styles.backgroundPoster} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div className={styles.heroContent}>
        <h1>Best experience with Skilledity</h1>
        <p>
          Skilledity is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.
        </p>
        <button className={styles.watchButton}>
          <Play className={styles.playIcon} />
          Start Watching Now
        </button>
      </div>
    </section>
  );
}
