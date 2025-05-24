import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, Calendar, Clock, Globe, Users } from 'lucide-react';
import { fetchMovieDetails, fetchMovieReviews, fetchSimilarMovies } from '@/lib/api';
import { formatDate, formatCurrency } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import styles from '@/styles/MovieDetails.module.css';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: movieDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
  });

  const { data: movieReviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['movieReviews', id],
    queryFn: () => fetchMovieReviews(id as string),
    enabled: !!id,
  });

  const { data: similarMovies, isLoading: similarLoading } = useQuery({
    queryKey: ['similarMovies', id],
    queryFn: () => fetchSimilarMovies(id as string),
    enabled: !!id,
  });

  const handleSearch = async (query: string) => {
    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  if (detailsLoading || !movieDetails) {
    return <div className={styles.loading}>Loading movie details...</div>;
  }

  return (
    <>
      <Head>
        <title>{movieDetails.title} | Skilledity</title>
        <meta name="description" content={movieDetails.overview?.slice(0, 160)} />
      </Head>

      <div className={styles.container}>
        <Navbar onSearch={handleSearch} onNavigate={() => router.push('/')} />
        <div className={styles.heroSectionCustom}>
          {movieDetails.backdrop_path && (
            <div className={styles.backdropCustom}>
              <Image
                src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className={styles.overlayCustom}></div>
            </div>
          )}
          <div className={styles.heroContentCustom}>
            <div className={styles.posterWrapperCustom}>
              {movieDetails.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  width={220}
                  height={320}
                  className={styles.posterCustom}
                />
              ) : (
                <div className={styles.noPoster}>No Poster Available</div>
              )}
            </div>
            <div className={styles.detailsCustom}>
              <h1 className={styles.titleCustom}>{movieDetails.title}</h1>
              {movieDetails.tagline && (
                <p className={styles.taglineCustom}>{movieDetails.tagline}</p>
              )}
              <div className={styles.actionRowCustom}>
                <button className={styles.playNowBtn}>Play Now</button>
                <button className={styles.actionIcon}><span>+</span></button>
                <button className={styles.actionIcon}><span>★</span></button>
                <button className={styles.actionIcon}><span>⤴</span></button>
              </div>
              <p className={styles.shortDescCustom}>{movieDetails.overview?.slice(0, 120) || 'No description available.'}</p>
              <div className={styles.metaCustom}>
                <div><b>Year:</b> {movieDetails.release_date?.slice(0, 4)}</div>
                <div><b>Languages:</b> {movieDetails.spoken_languages?.map(l => l.english_name).join(', ')}</div>
                <div><b>Genres:</b> {movieDetails.genres?.map(g => g.name).join(', ')}</div>
                <div className={styles.ratingsCustom}>
                  <span><b>IMDb</b> <Star size={14} fill="currentColor" /> {movieDetails.vote_average?.toFixed(1) || '-'}</span>
                  <span><b>Streamvibe</b> <Star size={14} fill="currentColor" /> 4.0</span>
                </div>
                <div><b>Director:</b> <span>Not Available</span></div>
                <div><b>Music:</b> <span>Not Available</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.pageContentCustom}>
          <div className={styles.leftColumnCustom}>
            {/* Description Card */}
            <div className={styles.cardCustom}>
              <h4>Description</h4>
              <p>{movieDetails.overview || 'No description available.'}</p>
            </div>
            {/* Cast Card */}
            <div className={styles.cardCustom}>
              <h4>Cast</h4>
              <div className={styles.castListCustom}>
                {movieDetails.credits && movieDetails.credits.cast && movieDetails.credits.cast.length > 0 ? (
                  movieDetails.credits.cast.slice(0, 8).map((actor) => (
                    <div key={actor.id} className={styles.castCardCustom}>
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          width={56}
                          height={56}
                          className={styles.castImgCustom}
                        />
                      ) : (
                        <div className={styles.castImgCustom}>
                          <Users size={28} color="#888" />
                        </div>
                      )}
                      <div className={styles.castNameCustom}>{actor.name}</div>
                    </div>
                  ))
                ) : (
                  [1,2,3,4,5,6].map(i => (
                    <div key={i} className={styles.castCardCustom}>
                      <div className={styles.castImgCustom}></div>
                      <div className={styles.castNameCustom}>Actor {i}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Reviews Card */}
            <div className={styles.cardCustom}>
              <div className={styles.reviewsHeaderCustom}>
                <h4>Reviews</h4>
                <button className={styles.addReviewBtnCustom}>+ Add Your Review</button>
              </div>
              <div className={styles.reviewsGridCustom}>
                {reviewsLoading ? (
                  <p>Loading reviews...</p>
                ) : movieReviews?.results?.length > 0 ? (
                  movieReviews.results.slice(0, 4).map((review) => (
                    <div key={review.id} className={styles.reviewCardCustom}>
                      <div className={styles.reviewHeaderCustom}>
                        <div className={styles.reviewerInfoCustom}>
                          {review.author_details?.avatar_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w100${review.author_details.avatar_path}`}
                              alt={review.author}
                              width={40}
                              height={40}
                              className={styles.reviewerAvatarCustom}
                            />
                          ) : (
                            <div className={styles.reviewerAvatarPlaceholderCustom}>
                              <Users size={18} />
                            </div>
                          )}
                          <div>
                            <div className={styles.reviewerNameCustom}>{review.author}</div>
                            <div className={styles.reviewerCountryCustom}>From Unknown</div>
                          </div>
                        </div>
                        <div className={styles.reviewRatingCustom}>
                          <Star size={14} fill="currentColor" />
                          <span>{review.author_details?.rating || '4.5'}</span>
                        </div>
                      </div>
                      <div className={styles.reviewContentCustom}>
                        <p>{review.content.length > 180 ? `${review.content.substring(0, 180)}...` : review.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.noReviews}>No reviews available for this movie.</p>
                )}
              </div>
            </div>
          </div>
          {/* Sidebar Card */}
          <div className={styles.sidebarCustom}>
            <div className={styles.cardCustom}>
              <div className={styles.metaSidebarCustom}><b>Released Year</b><span>{movieDetails.release_date?.slice(0, 4)}</span></div>
              <div className={styles.metaSidebarCustom}><b>Available Languages</b><span>{movieDetails.spoken_languages?.map(l => l.english_name).join(', ')}</span></div>
              <div className={styles.metaSidebarCustom}><b>Ratings</b>
                <div className={styles.ratingsSidebarCustom}>
                  <span><b>IMDb</b> <Star size={14} fill="currentColor" /> {movieDetails.vote_average?.toFixed(1) || '-'}</span>
                  <span><b>Streamvibe</b> <Star size={14} fill="currentColor" /> 4.0</span>
                </div>
              </div>
              <div className={styles.metaSidebarCustom}><b>Genres</b><span>{movieDetails.genres?.map(g => g.name).join(', ')}</span></div>
              <div className={styles.metaSidebarCustom}><b>Director</b><span>Not Available</span></div>
              <div className={styles.metaSidebarCustom}><b>Music</b><span>Not Available</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
