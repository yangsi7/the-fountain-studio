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
    // Function to scroll to hash target with retry mechanism
    const scrollToHash = (hash: string) => {
      if (hash && hash !== lastHashRef.current) {
        const id = hash.slice(1); // Remove '#' prefix

        // Retry mechanism: wait for element to appear in DOM
        let attempts = 0;
        const maxAttempts = 50; // 50 attempts × 100ms = 5 seconds max

        const tryScroll = () => {
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

              // Phase 2.3: Visual feedback after scroll completes
              setTimeout(() => {
                // Add highlight class for visual feedback
                element.classList.add('hash-target-highlight');

                // Accessibility: Focus management
                element.setAttribute('tabindex', '-1');
                element.focus({ preventScroll: true });

                // Accessibility: Screen reader announcement
                const srAnnouncement = document.createElement('div');
                srAnnouncement.setAttribute('role', 'status');
                srAnnouncement.setAttribute('aria-live', 'polite');
                srAnnouncement.className = 'sr-only';

                // Get section label for screen reader (use aria-label, heading text, or id)
                const sectionLabel = element.getAttribute('aria-label')
                  || element.querySelector('h1, h2, h3, h4, h5, h6')?.textContent
                  || id;
                srAnnouncement.textContent = `Navigated to ${sectionLabel}`;
                document.body.appendChild(srAnnouncement);

                // Cleanup after animation completes (2s)
                setTimeout(() => {
                  element.classList.remove('hash-target-highlight');
                  element.removeAttribute('tabindex');
                  if (document.body.contains(srAnnouncement)) {
                    document.body.removeChild(srAnnouncement);
                  }
                }, 2000);
              }, 150); // Small delay after scroll to ensure element is visible
            }, 100);
          } else if (attempts < maxAttempts) {
            // Element not found yet, retry after 100ms
            attempts++;
            setTimeout(tryScroll, 100);
          }
        };

        tryScroll();
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
