import React from 'react';
import useRents from '../useRents.js';
import '../../RealEstateAgents/AgentPannel.css';
// ─── Sub Components ───────────────────────────────────────────────────────────
const SkeletonRows = () => (
  <tbody>
    {[1, 2, 3, 4, 5].map(i => (
      <tr key={i}>
        <td><div className="rents-skeleton" style={{ width: '60%' }} /></td>
        <td><div className="rents-skeleton" style={{ width: '70%' }} /></td>
        <td><div className="rents-skeleton" style={{ width: '40%' }} /></td>
        <td><div className="rents-skeleton" style={{ width: '50%' }} /></td>
        <td><div className="rents-skeleton" style={{ width: '40%' }} /></td>
        <td><div className="rents-skeleton" style={{ width: '30%' }} /></td>
      </tr>
    ))}
  </tbody>
);

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

const RentRow = ({ rent }) => (
  <tr>
    <td>
      <p className="rents-tenant-name">{rent.fullName}</p>
      <p className="rents-tenant-phone">{rent.mobile}</p>
    </td>
    <td>
      <p className="rents-property-name">{rent.propertyTitle}</p>
      <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>ID: {rent.propertyId}</p>
    </td>
    <td>
      <span className="rents-badge type">{rent.rentTypeName}</span>
    </td>
    <td>
      <span className="rents-amount">
        {rent.monthlyAmount?.toLocaleString()} SAR
      </span>
      <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>
        Total: {rent.totalAmount?.toLocaleString()} SAR
      </p>
    </td>
    <td>
      <p className="rents-date">{formatDate(rent.startDate)}</p>
      <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>
        → {formatDate(rent.endDate)}
      </p>
    </td>
    <td>
      <span className={`rents-badge ${rent.status === 1 ? 'active' : 'inactive'}`}>
        {rent.status === 1 ? 'Active' : 'Inactive'}
      </span>
    </td>
  </tr>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Rents() {

  const { rents, loading, error, refetch } = useRents();

  return (
    <div className="rents-page">

      {/* ── Header ── */}
      <div className="rents-header">
        <div>
          <h2 className="rents-title">Rents</h2>
          <p className="rents-count">{rents.length} active contracts</p>
        </div>
        <button className="rents-refetch-btn" onClick={refetch}>
          <i className="fa-solid fa-rotate-right" /> Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rents-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load rents.
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <table className="rents-table">
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Property</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>

        {loading ? <SkeletonRows /> : (
          <tbody>
            {rents.length > 0 ? (
              rents.map(rent => (
                <RentRow key={rent.id} rent={rent} />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="rents-empty">
                    <i className="fa-solid fa-key" />
                    <p>No rents found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

    </div>
  );
}