'use client';
import React from 'react';
import AddressMap from '../Info/AddresMap';
import styles from './LocationMap.module.css';


 
        // 0 - 21
       // npr '220px' ili '50vh'
        // tekst koji se pojavi kao alt/aria
      // ako true, linkuje i embeduje OpenStreetMap umesto Google Maps


const LocationMap: React.FC= () => {
  // Google embed (bez API ključa): query + output=embed
  
  const lat = 43.3192091;
  const lng = 21.9308153;
  const zoom = 15;
  const label = 'Prikaži lokaciju salona u Google Maps';
  const useOSM = false

  const gEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
  const gLinkUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  // OpenStreetMap embed and link (fallback/no-Google)
  const osmDelta = 0.01; // veličina bbox
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - osmDelta},${lat - osmDelta},${lng + osmDelta},${lat + osmDelta}&layer=mapnik&marker=${lat},${lng}`;
  const osmLinkUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;

  const embedSrc = useOSM ? osmEmbedUrl : gEmbedUrl;
  const linkHref = useOSM ? osmLinkUrl : gLinkUrl;

  return (
    <section className={styles.mapSection}>
      <h4>Adresa</h4>
      <AddressMap />
      <div className={styles.mapWrap}>
      <iframe
        className={styles.mapIframe}
        src={embedSrc}
        title={label}
        aria-hidden="false"
      />

      {/* overlay link koji hvata klik i otvara full mapu u novom tabu */}
      <a
        className={styles.mapOverlay}
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <span className={styles.srOnly}>Otvori u Google Maps</span>
      </a>
      </div>
    </section>
  );
};

export default LocationMap;
