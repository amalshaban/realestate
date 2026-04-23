import React, { useState, useCallback } from 'react';
import useVisitRequests from '../useVisitRequests.js';
import '../../RealEstateAgents/AgentPannel.css';

// ─── Sub Components ───────────────────────────────────────────────────────────
const SkeletonRows = () => (
  <tbody>
    {[1, 2, 3, 4, 5].map(i => (
      <tr key={i}>
        <td><div className="vr-skeleton" style={{ width: '60%' }} /></td>
        <td><div className="vr-skeleton" style={{ width: '70%' }} /></td>
        <td><div className="vr-skeleton" style={{ width: '50%' }} /></td>
        <td><div className="vr-skeleton" style={{ width: '40%' }} /></td>
        <td><div className="vr-skeleton" style={{ width: '30%' }} /></td>
      </tr>
    ))}
  </tbody>
);

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── Suggested Dates Panel ────────────────────────────────────────────────────
const SuggestedDatesPanel = ({
  request, suggestedDates, adding, deleting,
  onAdd, onDelete, onFetch,
}) => {
  const [dateTime, setDateTime] = useState('');
  const dates = suggestedDates[request.requestId] || [];

  const handleAdd = useCallback(async () => {
    if (!dateTime) return;
    await onAdd(request.requestId, dateTime);
    setDateTime('');
  }, [dateTime, request.requestId, onAdd]);

  return (
    <tr className="vr-expanded-row">
      <td colSpan={5}>
        <div className="vr-suggested-dates">
          <p className="vr-suggested-dates-title">
            <i className="fa-regular fa-calendar me-2" />
            Suggested Visit Dates
          </p>

          {/* ── Add Date Form ── */}
          <div className="vr-add-date-form">
            <input
              type="datetime-local"
              className="vr-date-input"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
            />
            <button
              className="vr-add-btn"
              onClick={handleAdd}
              disabled={!dateTime || adding === request.requestId}
            >
              {adding === request.requestId
                ? <><span className="spinner-border spinner-border-sm me-1" />Adding...</>
                : <><i className="fa-solid fa-plus me-1" />Add Date</>
              }
            </button>
          </div>

          {/* ── Date List ── */}
          <div className="vr-date-list">
            {dates.length > 0 ? dates.map(date => (
              <div key={date.id} className="vr-date-item">
                <span className="vr-date-item-text">
                  <i className="fa-regular fa-clock" />
                  {formatDate(date.suggestedDateTime)}
                </span>
                <button
                  className="vr-delete-btn"
                  onClick={() => onDelete(date.id, request.requestId)}
                  disabled={deleting === date.id}
                >
                  {deleting === date.id
                    ? <span className="spinner-border spinner-border-sm" />
                    : <i className="fa-solid fa-trash" />
                  }
                </button>
              </div>
            )) : (
              <p className="vr-no-dates">No suggested dates yet</p>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

// ─── Request Row ──────────────────────────────────────────────────────────────
const RequestRow = ({
  request, isExpanded, onToggle,
  suggestedDates, adding, deleting,
  onAdd, onDelete, onFetch,
}) => (
  <>
    <tr>
      <td>
        <p className="vr-user-name">{request.userName}</p>
        <p className="vr-user-phone">{request.userPhone}</p>
      </td>
      <td>
        <p className="vr-property-name">{request.propertyName}</p>
        <p className="vr-property-id">ID: {request.propertyId}</p>
      </td>
      <td>
        <span className="vr-date">{formatDate(request.requestDate)}</span>
      </td>
      <td>
        <span className="vr-date">#{request.requestId}</span>
      </td>
      <td>
        <button
          className={`vr-suggest-btn ${isExpanded ? 'active' : ''}`}
          onClick={() => onToggle(request.requestId)}
        >
          <i className={`fa-solid fa-calendar-${isExpanded ? 'minus' : 'plus'}`} />
          {isExpanded ? 'Hide Dates' : 'Suggest Date'}
        </button>
      </td>
    </tr>

    {isExpanded && (
      <SuggestedDatesPanel
        request={request}
        suggestedDates={suggestedDates}
        adding={adding}
        deleting={deleting}
        onAdd={onAdd}
        onDelete={onDelete}
        onFetch={onFetch}
      />
    )}
  </>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VisitRequests() {

  const {
    requests, loading, error,
    suggestedDates, adding, deleting,
    fetchSuggestedDates, addSuggestedDate, deleteSuggestedDate,
    refetch,
  } = useVisitRequests();

  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggle = useCallback(async (requestId) => {
    if (expandedRow === requestId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(requestId);
      await fetchSuggestedDates(requestId);
    }
  }, [expandedRow, fetchSuggestedDates]);

  return (
    <div className="visit-requests-page">

      {/* ── Header ── */}
      <div className="visit-requests-header">
        <div>
          <h2 className="visit-requests-title">Visit Requests</h2>
          <p className="visit-requests-count">
            {requests.length} requests received
          </p>
        </div>
        <button className="vr-refetch-btn" onClick={refetch}>
          <i className="fa-solid fa-rotate-right" /> Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="vr-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load requests.
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <table className="visit-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Property</th>
            <th>Request Date</th>
            <th>Request ID</th>
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
                  isExpanded={expandedRow === request.requestId}
                  onToggle={handleToggle}
                  suggestedDates={suggestedDates}
                  adding={adding}
                  deleting={deleting}
                  onAdd={addSuggestedDate}
                  onDelete={deleteSuggestedDate}
                  onFetch={fetchSuggestedDates}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="vr-empty">
                    <i className="fa-solid fa-calendar-xmark" />
                    <p>No visit requests found</p>
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