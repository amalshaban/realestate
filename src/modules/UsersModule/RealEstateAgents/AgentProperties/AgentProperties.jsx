import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAgentProperties from '../UseAgentProperties.js';
import '../../RealEstateAgents/AgentPannel.css';


// ─── Sub Components ───────────────────────────────────────────────────────────
const SkeletonRows = () => (
  <tbody>
    {[1, 2, 3, 4, 5].map(i => (
      <tr key={i}>
        <td colSpan={5}>
          <div className="ap-skeleton-row">
            <div className="ap-skeleton" style={{ width: '30%' }} />
            <div className="ap-skeleton" style={{ width: '15%' }} />
            <div className="ap-skeleton" style={{ width: '15%' }} />
            <div className="ap-skeleton" style={{ width: '15%' }} />
            <div className="ap-skeleton" style={{ width: '10%' }} />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

const PropertyRow = ({ property, onView, onEdit, onDelete }) => (
  <tr>
    <td>
      <p className="ap-table-title">{property.title}</p>
      <p className="ap-table-desc">{property.description}</p>
    </td>
    <td>
      <span className="ap-table-price">
        {property.price?.toLocaleString()} SAR
      </span>
    </td>
    <td>
      <span className={`ap-badge ${property.forRent ? 'rent' : 'sale'}`}>
        {property.forRent ? 'For Rent' : 'For Sale'}
      </span>
    </td>
    <td>
      <span className={`ap-badge ${property.status?.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
        {property.status || 'Active'}
      </span>
    </td>
    <td>
      <div className="ap-actions">
        <button className="ap-action-btn view" onClick={() => onView(property.id)} title="View">
          <i className="fa-solid fa-eye" />
        </button>
        <button className="ap-action-btn edit" onClick={() => onEdit(property.id)} title="Edit">
          <i className="fa-solid fa-pen" />
        </button>
        <button className="ap-action-btn delete" onClick={() => onDelete(property.id)} title="Delete">
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </td>
  </tr>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AgentProperties() {

  const { properties, loading, error, refetch } = useAgentProperties();
  const navigate = useNavigate();

  const handleView   = useCallback((id) => navigate(`/properties/property/${id}`), [navigate]);
  const handleEdit   = useCallback((id) => navigate(`/agentpannel/editproperty/${id}`), [navigate]);
  const handleDelete = useCallback((id) => {
    // هنضيف confirm dialog لما نوصل لـ delete
  }, []);

  return (
    <div className="agent-properties-page">

      {/* ── Header ── */}
      <div className="agent-properties-header">
        <div>
          <h2 className="agent-properties-title">My Properties</h2>
          <p className="agent-properties-count">
            {properties.length} properties listed
          </p>
        </div>
        <button
          className="ap-action-btn"
          style={{ width: 'auto', padding: '10px 20px', background: '#0b0d2a', color: '#fff', borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}
          onClick={() => navigate('/agentpannel/addproperty')}
        >
          <i className="fa-solid fa-plus me-2" />
          Add Property
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="ap-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load properties.
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <table className="agent-properties-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Price</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {loading ? <SkeletonRows /> : (
          <tbody>
            {properties.length > 0 ? (
              properties.map(property => (
                <PropertyRow
                  key={property.id}
                  property={property}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="ap-empty">
                    <i className="fa-solid fa-building-circle-xmark" />
                    <p>No properties found</p>
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