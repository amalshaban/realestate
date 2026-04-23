import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useRentalRequests from '../useRentalRequests.js';
import '../../RealEstateAgents/AgentPannel.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

// ─── Sub Components ───────────────────────────────────────────────────────────
const SkeletonRows = () => (
  <tbody>
    {[1, 2, 3, 4, 5].map(i => (
      <tr key={i}>
        {[60, 70, 40, 30, 40, 50].map((w, j) => (
          <td key={j}><div className="rr-skeleton" style={{ width: `${w}%` }} /></td>
        ))}
      </tr>
    ))}
  </tbody>
);

// ─── Create Rent Modal ────────────────────────────────────────────────────────
const CreateRentModal = ({ request, onClose, onSubmit, creating }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      propertyId:    request.propertyId,
      rentRequestId: request.requestId,
      fullName:      request.userName,
      mobile:        request.userPhone,
      monthlyPayment: request.offeredPrice,
    },
  });

  return (
    <div className="rr-modal-overlay" onClick={onClose}>
      <div className="rr-modal" onClick={e => e.stopPropagation()}>

        <h3 className="rr-modal-title">Create Rent Contract</h3>
        <p className="rr-modal-subtitle">{request.propertyName}</p>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Row className="g-2">

            <Col md={6}>
              <label className="rr-modal-label">Full Name</label>
              <input className="rr-modal-input form-control"
                {...register('fullName', { required: 'Required' })} />
              {errors.fullName && <p style={{ fontSize: '11px', color: '#e53e3e', margin: '2px 0 0' }}>{errors.fullName.message}</p>}
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">Mobile</label>
              <input className="rr-modal-input form-control"
                {...register('mobile', { required: 'Required' })} />
              {errors.mobile && <p style={{ fontSize: '11px', color: '#e53e3e', margin: '2px 0 0' }}>{errors.mobile.message}</p>}
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">National ID</label>
              <input className="rr-modal-input form-control"
                {...register('nationalId', { required: 'Required' })} />
              {errors.nationalId && <p style={{ fontSize: '11px', color: '#e53e3e', margin: '2px 0 0' }}>{errors.nationalId.message}</p>}
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">Nationality ID</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('nationalityId', { required: 'Required' })} />
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">National Type ID</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('nationalTypeId', { required: 'Required' })} />
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">Rent Type ID</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('rentTypeId', { required: 'Required' })} />
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">Start Date</label>
              <input type="date" className="rr-modal-input form-control"
                {...register('startDate', { required: 'Required' })} />
              {errors.startDate && <p style={{ fontSize: '11px', color: '#e53e3e', margin: '2px 0 0' }}>{errors.startDate.message}</p>}
            </Col>

            <Col md={6}>
              <label className="rr-modal-label">End Date</label>
              <input type="date" className="rr-modal-input form-control"
                {...register('endDate', { required: 'Required' })} />
              {errors.endDate && <p style={{ fontSize: '11px', color: '#e53e3e', margin: '2px 0 0' }}>{errors.endDate.message}</p>}
            </Col>

            <Col md={4}>
              <label className="rr-modal-label">Monthly Payment</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('monthlyPayment', { required: 'Required' })} />
            </Col>

            <Col md={4}>
              <label className="rr-modal-label">Monthly Amount</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('monthlyAmount', { required: 'Required' })} />
            </Col>

            <Col md={4}>
              <label className="rr-modal-label">Total Amount</label>
              <input type="number" className="rr-modal-input form-control"
                {...register('totalAmount', { required: 'Required' })} />
            </Col>

            <input type="hidden" {...register('propertyId')} />
            <input type="hidden" {...register('rentRequestId')} />
            <input type="hidden" {...register('status')} value={1} />

          </Row>

          <div className="rr-modal-footer">
            <button type="button" className="rr-modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="rr-modal-submit-btn" disabled={creating}>
              {creating
                ? <><span className="spinner-border spinner-border-sm" /> Creating...</>
                : <><i className="fa-solid fa-file-contract" /> Create Contract</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Request Row ──────────────────────────────────────────────────────────────
const RequestRow = ({ request, onAccept, onCreateRent, accepting }) => {
  const isAccepted = request.status === 1 || request.status === 2;

  return (
    <tr>
      <td>
        <p className="rr-user-name">{request.userName}</p>
        <p className="rr-user-phone">{request.userPhone}</p>
      </td>
      <td>
        <p className="rr-property-name">{request.propertyName}</p>
        <p className="rr-property-id">ID: {request.propertyId}</p>
      </td>
      <td>
        <span className="rr-badge type">{request.rentTypeName}</span>
      </td>
      <td>
        <span className="rr-price">{request.offeredPrice?.toLocaleString()} SAR</span>
      </td>
      <td>
        <span className="rr-date">{formatDate(request.requestDate)}</span>
      </td>
      <td>
        <div className="rr-actions">
          <button
            className={`rr-accept-btn ${isAccepted ? 'accepted' : ''}`}
            onClick={() => onAccept(request.requestId)}
            disabled={isAccepted || accepting === request.requestId}
          >
            {accepting === request.requestId
              ? <><span className="spinner-border spinner-border-sm" /> Accepting...</>
              : isAccepted
                ? <><i className="fa-solid fa-circle-check" /> Accepted</>
                : <><i className="fa-solid fa-check" /> Accept</>
            }
          </button>

          {isAccepted && (
            <button className="rr-create-btn" onClick={() => onCreateRent(request)}>
              <i className="fa-solid fa-file-contract" /> Create Rent
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RentalRequests() {

  const {
    requests, loading, error,
    accepting, creating,
    acceptRequest, createRent,
    refetch,
  } = useRentalRequests();

  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleCreateRent = useCallback(async (data) => {
    const success = await createRent(data);
    if (success) {
      toast.success('Rent contract created successfully!');
      setSelectedRequest(null);
    } else {
      toast.error('Failed to create rent contract.');
    }
  }, [createRent]);

  return (
    <div className="rental-requests-page">

      {/* ── Header ── */}
      <div className="rental-requests-header">
        <div>
          <h2 className="rental-requests-title">Rental Requests</h2>
          <p className="rental-requests-count">{requests.length} requests received</p>
        </div>
        <button className="rr-refetch-btn" onClick={refetch}>
          <i className="fa-solid fa-rotate-right" /> Refresh
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rr-error">
          <i className="fa-solid fa-circle-exclamation" />
          Failed to load requests.
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', textDecoration: 'underline' }}>
            Try again
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <table className="rental-requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Property</th>
            <th>Rent Type</th>
            <th>Offered Price</th>
            <th>Request Date</th>
            <th>Actions</th>
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
                  onCreateRent={setSelectedRequest}
                  accepting={accepting}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="rr-empty">
                    <i className="fa-solid fa-file-circle-xmark" />
                    <p>No rental requests found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      {/* ── Create Rent Modal ── */}
      {selectedRequest && (
        <CreateRentModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSubmit={handleCreateRent}
          creating={creating}
        />
      )}

    </div>
  );
}