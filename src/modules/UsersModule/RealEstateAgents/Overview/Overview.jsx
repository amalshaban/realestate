import React, { useCallback } from 'react';
import {useAgentStats} from '../useAgentData.js';
import '../../RealEstateAgents/AgentPannel.css';


// ─── Constants ────────────────────────────────────────────────────────────────
const STAT_CARDS = (stats) => [
  {
    label: 'Total Properties',
    value: stats?.totalProperties   ?? 0,
    color: 'blue',
    badge: '+16%',
  },
  {
    label: 'For Sale',
    value: stats?.propertiesForSale ?? 0,
    color: 'green',
    badge: '+62%',
  },
  {
    label: 'For Rent',
    value: stats?.propertiesForRent ?? 0,
    color: 'yellow',
    badge: '+48%',
  },
  {
    label: 'Purchase Requests',
    value: stats?.purchaseRequests  ?? 0,
    color: 'red',
    badge: '+21%',
  },
  {
    label: 'Rental Requests',
    value: stats?.rentalRequests    ?? 0,
    color: 'purple',
    badge: '+35%',
  },
];

// ─── Sub Components ───────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, badge }) => (
  <div className={`stat-card ${color}`}>
    <span className="stat-card-badge">{badge}</span>
    <p className="stat-card-value">{value}</p>
    <p className="stat-card-label">{label}</p>
  </div>
);

const SkeletonGrid = () => (
  <div className="overview-stats-grid">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className="stat-skeleton" />
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Overview() {

  const { stats, loading, error, lastUpdated, refetch } = useAgentStats();

  const formatLastUpdated = useCallback(() => {
    if (!lastUpdated) return '';
    const mins = Math.floor((new Date() - lastUpdated) / 60000);
    if (mins < 1) return 'Just now';
    return `Last Updated: ${mins} Min${mins > 1 ? 's' : ''} ago`;
  }, [lastUpdated]);

  return (
    <div className="overview-page">

      {/* ── Header ── */}
      <div className="overview-header">
        <h2 className="overview-title">Overview</h2>
        <div className="d-flex align-items-center gap-3">
          {lastUpdated && (
            <span className="overview-last-updated">{formatLastUpdated()}</span>
          )}
          <button className="overview-refetch-btn" onClick={refetch}>
            <i className="fa-solid fa-rotate-right" /> Refresh
          </button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="overview-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load stats. Please try again.
        </div>
      )}

      {/* ── Loading ── */}
      {loading && <SkeletonGrid />}

      {/* ── Stats Grid ── */}
      {!loading && !error && (
        <div className="overview-stats-grid">
          {STAT_CARDS(stats).map(card => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>
      )}

    </div>
  );
}