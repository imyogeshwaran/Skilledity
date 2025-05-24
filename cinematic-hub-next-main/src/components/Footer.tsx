import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h2>Home</h2>
          <ul>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/devices">Devices</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Movies</h2>
          <ul>
            <li><Link href="/movies/genres">Genres</Link></li>
            <li><Link href="/movies/trending">Trending</Link></li>
            <li><Link href="/movies/new">New Release</Link></li>
            <li><Link href="/movies/popular">Popular</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Shows</h2>
          <ul>
            <li><Link href="/shows/genres">Genres</Link></li>
            <li><Link href="/shows/trending">Trending</Link></li>
            <li><Link href="/shows/new">New Release</Link></li>
            <li><Link href="/shows/popular">Popular</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Support</h2>
          <ul>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Subscription</h2>
          <ul>
            <li><Link href="/plans">Plans</Link></li>
            <li><Link href="/features">Features</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Connect With Us</h2>
          <div className={styles.socialLinks}>
            <Link href="https://facebook.com" target="_blank">
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © 2023 Skilledity, All Rights Reserved
        </div>
        <div className={styles.policies}>
          <Link href="/terms">Terms of Use</Link>
          <span>|</span>
          <Link href="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
