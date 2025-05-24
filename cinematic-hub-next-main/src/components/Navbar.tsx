import { useState } from 'react';
import { useRouter } from 'next/router';
import { Search, Menu, X } from 'lucide-react';
import styles from '@/styles/Navbar.module.css';

interface NavbarProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

export default function Navbar({ onSearch, onNavigate }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const navItems = [
    { label: 'Home', value: 'genres' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Latest', value: 'latest' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'topRated' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <span>skilledity</span>
        </div>

        <div className={`${styles.navItems} ${isMenuOpen ? styles.active : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onNavigate(item.value);
                setIsMenuOpen(false);
              }}
              className={styles.navItem}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={18} />
          </button>
        </form>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
