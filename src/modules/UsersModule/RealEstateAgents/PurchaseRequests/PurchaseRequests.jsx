import React, { useCallback } from 'react';
import usePurchaseRequests from '../usePurchaseRequests.js';
import '../../RealEstateAgents/AgentPannel.css';

// ─── Sub Components ───────────────────────────────────────────────────────────
const SkeletonRows = () => (
  <tbody>
    {[1, 2, 3, 4, 5].map(i => (
      <tr key={i}>
        <td><div className="pr-skeleton" style={{ width: '60%' }} /></td>
        <td><div className="pr-skeleton" style={{ width: '70%' }} /></td>
        <td><div className="pr-skeleton" style={{ width: '40%' }} /></td>
        <td><div className="pr-skeleton" style={{ width: '50%' }} /></td>
        <td><div className="pr-skeleton" style={{ width: '30%' }} /></td>
        <td><div className="pr-skeleton" style={{ width: '40%' }} /></td>
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

const RequestRow = ({ request, onAccept, isAccepting }) => {
  const isAccepted = request.status === 1 || request.status === 2;

  return (
    <tr>
      <td>
        <p className="pr-user-name">{request.userName}</p>
        <p className="pr-user-phone">{request.userPhone}</p>
      </td>
      <td>
        <p className="pr-property-name">{request.propertyName}</p>
        <p className="pr-property-id">ID: {request.propertyId}</p>
      </td>
      <td>
        <span className="pr-price">
          {request.offeredPrice?.toLocaleString()} SAR
        </span>
      </td>
      <td>
        <p className="pr-notes" title={request.notes}>
          {request.notes || '—'}
        </p>
      </td>
      <td>
        <span className="pr-date">
          {formatDate(request.requestDate)}
        </span>
      </td>
         <td>
        <button
          className={`pr-accept-btn ${isAccepted ? 'accepted' : ''}`}
          onClick={() => onAccept(request.requestId)}
          disabled={isAccepted || isAccepting === request.requestId}
        >
          {isAccepting === request.requestId ? (
            <><span className="spinner-border spinner-border-sm" /> Accepting...</>
          ) : isAccepted ? (
            <><i className="fa-solid fa-circle-check" /> Accepted</>
          ) : (
            <><i className="fa-solid fa-check" /> Accept</>
          )}
        </button>
      </td>
    </tr>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PurchaseRequests() {

  const { requests, loading, error, accepting, acceptRequest, refetch } = usePurchaseRequests();

  return (
    <div className="purchase-requests-page">

      {/* ── Header ── */}
      <div className="purchase-requests-header">
        <div>
          <h2 className="purchase-requests-title">Purchase Requests</h2>
          <p className="purchase-requests-count">
            {requests.length} requests received
          </p>
        </div>
        <button className="pr-refetch-btn" onClick={refetch}>
          <i className="fa-solid fa-rotate-right" /> Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="pr-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load requests.
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <table className="purchase-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Property</th>
            <th>Offered Price</th>
            <th>Notes</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>

        {loading ? <SkeletonRows /> : (
          <tbody>
            {requests.length > 0 ? (
              requests.map(request => (
                <RequestRow
                  key={request.requestId}
                  request={request}
                  onAccept={acceptRequest}
                  isAccepting={accepting}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="pr-empty">
                    <i className="fa-solid fa-hand-holding-dollar" />
                    <p>No purchase requests found</p>
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