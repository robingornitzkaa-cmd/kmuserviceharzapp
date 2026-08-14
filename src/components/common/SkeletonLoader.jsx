import React from 'react';

/**
 * SkeletonLoader Komponente.
 * Zeigt moderne, animierte Shimmer-Platzhalter während Unterseiten
 * per React.lazy() und Suspense asynchron nachgeladen werden.
 */
export const SkeletonLoader = ({ tabName = 'Ansicht' }) => {
  return (
    <div className="skeleton-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.3s ease' }}>
      {/* Header Skeleton */}
      <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '0.5rem' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div className="skeleton-box" style={{ width: '180px', height: '20px', borderRadius: '0.25rem' }}></div>
            <div className="skeleton-box" style={{ width: '120px', height: '12px', borderRadius: '0.25rem' }}></div>
          </div>
        </div>
        <div className="skeleton-box" style={{ width: '100px', height: '32px', borderRadius: '0.375rem' }}></div>
      </div>

      {/* Grid Content Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '220px' }}>
          <div className="skeleton-box" style={{ width: '50%', height: '18px', borderRadius: '0.25rem' }}></div>
          <div className="skeleton-box" style={{ width: '100%', height: '70px', borderRadius: '0.375rem' }}></div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
            <div className="skeleton-box" style={{ width: '80px', height: '28px', borderRadius: '0.25rem' }}></div>
            <div className="skeleton-box" style={{ width: '80px', height: '28px', borderRadius: '0.25rem' }}></div>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '220px' }}>
          <div className="skeleton-box" style={{ width: '60%', height: '18px', borderRadius: '0.25rem' }}></div>
          <div className="skeleton-box" style={{ width: '100%', height: '18px', borderRadius: '0.25rem' }}></div>
          <div className="skeleton-box" style={{ width: '90%', height: '18px', borderRadius: '0.25rem' }}></div>
          <div className="skeleton-box" style={{ width: '75%', height: '18px', borderRadius: '0.25rem' }}></div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '180px' }}>
        <div className="skeleton-box" style={{ width: '30%', height: '18px', borderRadius: '0.25rem' }}></div>
        <div className="skeleton-box" style={{ width: '100%', height: '14px', borderRadius: '0.25rem' }}></div>
        <div className="skeleton-box" style={{ width: '95%', height: '14px', borderRadius: '0.25rem' }}></div>
        <div className="skeleton-box" style={{ width: '85%', height: '14px', borderRadius: '0.25rem' }}></div>
      </div>
    </div>
  );
};
