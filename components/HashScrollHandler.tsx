'use client';

import { useEffect, useRef } from 'react';

/**
 * Client component that handles smooth scrolling to hash fragments in URLs.
 *
 * Usage: Add to pages that have anchor links (e.g., /services#pricing)
 *
 * Why needed: Next.js Link with scroll={false} disables automatic scroll.
 * This component re-enables smooth scrolling to hash targets while preserving
 * the scroll={false} behavior (prevents scroll-to-top on navigation).
 *
 * Handles both:
 * - Browser hashchange events (cross-page navigation, direct URL access)
 * - Next.js shallow routing (same-page hash link clicks with scroll={false})
 */
export function HashScrollHandler() {
  const lastHashRef = useRef<string>('');

  useEffect(() => {
    // Function to scroll to hash target
    const scrollToHash = (hash: string) => {
      if (hash && hash !== lastHashRef.current) {
        const id = hash.slice(1); // Remove '#' prefix
        const element = document.getElementById(id);

        if (element) {
          lastHashRef.current = hash;
          // Wait for page to fully load before scrolling
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }, 100);
        }
      }
    };

    // Scroll on mount (for direct URL access with hash)
    const initialHash = window.location.hash;
    if (initialHash) {
      scrollToHash(initialHash);
    }

    // Handle hash changes via browser hashchange event
    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);

    // Also poll for hash changes (catches Next.js shallow routing)
    // This is needed because Next.js Link with scroll={false} may not trigger hashchange
    const pollInterval = setInterval(() => {
      const currentHash = window.location.hash;
      if (currentHash && currentHash !== lastHashRef.current) {
        scrollToHash(currentHash);
      }
    }, 100); // Poll every 100ms

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(pollInterval);
    };
  }, []);

  return null; // This component doesn't render anything
}
