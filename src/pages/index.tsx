import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MovieSection from '@/components/MovieSection';
import SearchResults from '@/components/SearchResults';
import { PageTransition } from '@/components/ui/page-transition';
import { fetchMoviesBySection, searchMovies } from '@/lib/api';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const searchParam = router.query.search as string | undefined;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [currentPages, setCurrentPages] = useState({
    upcoming: 1,
    latest: 1,
    popular: 1,
    topRated: 1
  });

  const genresRef = useRef(null);
  const upcomingRef = useRef(null);
  const latestRef = useRef(null);
  const popularRef = useRef(null);
  const topRatedRef = useRef(null);

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
      handleSearch(searchParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  const scrollToSection = (section: string) => {
    const refs = {
      genres: genresRef,
      upcoming: upcomingRef,
      latest: latestRef,
      popular: popularRef,
      topRated: topRatedRef
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { data: upcomingData } = useQuery({
    queryKey: ['upcoming', currentPages.upcoming],
    queryFn: () => fetchMoviesBySection('upcoming', currentPages.upcoming),
  });

  const { data: latestData } = useQuery({
    queryKey: ['latest', currentPages.latest],
    queryFn: () => fetchMoviesBySection('now_playing', currentPages.latest),
  });

  const { data: popularData } = useQuery({
    queryKey: ['popular', currentPages.popular],
    queryFn: () => fetchMoviesBySection('popular', currentPages.popular),
  });

  const { data: topRatedData } = useQuery({
    queryKey: ['topRated', currentPages.topRated],
    queryFn: () => fetchMoviesBySection('top_rated', currentPages.topRated),
  });

  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=db75be3f6da59e6c54d0b9f568d19d16').then(res => res.json()),
  });

  const handlePageChange = (section: string, page: number) => {
    setCurrentPages(prev => ({ ...prev, [section]: page }));
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const data = await searchMovies(query);
        setSearchResults(data);
        router.replace({ pathname: '/', query: { search: query } }, undefined, { shallow: true });
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults(null);
      router.replace('/', undefined, { shallow: true });
    }
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <Navbar onSearch={handleSearch} onNavigate={scrollToSection} />
        {searchResults ? (
          <SearchResults results={searchResults} query={searchQuery} onClear={() => {
            setSearchResults(null);
            setSearchQuery('');
            router.replace('/', undefined, { shallow: true });
          }} />
        ) : (
          <>
            <HeroSection />
            <main className={styles.main}>
              <section ref={genresRef} className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Genres</h2>
                <div className={styles.divider}></div>
                <div className={styles.genresGrid}>
                  {genresData?.genres?.slice(0, 10).map((genre) => (
                    <div key={genre.id} className={styles.genreCard}>
                      <span>{genre.name}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section ref={upcomingRef} className={styles.section}>
                <MovieSection
                  title="Upcoming Bangers"
                  movies={upcomingData?.results || []}
                  type="upcoming"
                  currentPage={currentPages.upcoming}
                  totalPages={upcomingData?.total_pages || 1}
                  onPageChange={(page) => handlePageChange('upcoming', page)}
                />
              </section>
              <section ref={latestRef} className={styles.section}>
                <MovieSection
                  title="Latest on Skilledity"
                  movies={latestData?.results || []}
                  type="latest"
                  currentPage={currentPages.latest}
                  totalPages={latestData?.total_pages || 1}
                  onPageChange={(page) => handlePageChange('latest', page)}
                />
              </section>
              <section ref={topRatedRef} className={styles.section}>
                <MovieSection
                  title="Top Rated"
                  movies={topRatedData?.results || []}
                  type="topRated"
                  currentPage={currentPages.topRated}
                  totalPages={topRatedData?.total_pages || 1}
                  onPageChange={(page) => handlePageChange('topRated', page)}
                />
              </section>
              <section ref={popularRef} className={styles.section}>
                <MovieSection
                  title="Popular"
                  movies={popularData?.results || []}
                  type="popular"
                  currentPage={currentPages.popular}
                  totalPages={popularData?.total_pages || 1}
                  onPageChange={(page) => handlePageChange('popular', page)}
                />
              </section>
            </main>
          </>
        )}
      </div>
    </PageTransition>
  );
} 