import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../AuthModule/auth.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const SELECT_OPTIONS = [
  {
    id: 'personal',
    icon: 'fa-solid fa-user',
    title: 'Personal Use',
    desc: 'Browse, save, and find your dream home with ease',
  },
  {
    id: 'professional',
    icon: 'fa-solid fa-briefcase',
    title: 'Professional',
    desc: 'List properties, manage clients, and grow your business',
  },
];

const ROLE_OPTIONS = [
  {
    id: 'agent',
    icon: 'fa-solid fa-user-gear',
    title: 'Real Estate Agent',
    desc: 'List properties, manage clients, and close deals',
    route: '/auth/join/SignUpAgent',
  },
  {
    id: 'owner',
    icon: 'fa-solid fa-house',
    title: 'Property Owner/Seller',
    desc: 'List your property and connect with buyers',
    route: '/auth/join/SignUpOwner',
  },
  {
    id: 'developer',
    icon: 'fa-solid fa-building',
    title: 'Real Estate Developer',
    desc: 'Showcase projects and manage developments',
    route: '/auth/join/SignUpDeveloper',
  },
];

// ─── Sub Components ───────────────────────────────────────────────────────────
const OptionCard = ({ option, selected, onSelect }) => (
  <div
    className={`signup-option-card ${selected === option.id ? 'selected' : ''}`}
    onClick={() => onSelect(option.id)}
  >
    <i className={option.icon} />
    <h6>{option.title}</h6>
    <p>{option.desc}</p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SignUp() {

  const [view,     setView]     = useState('select');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleContinue = useCallback(() => {
    if (!selected) return;

    if (view === 'select') {
      if (selected === 'personal') {
        navigate('/auth/join/SignUpNormal');
      } else {
        setSelected(null);
        setView('role');
      }
      return;
    }

    if (view === 'role') {
      const role = ROLE_OPTIONS.find(r => r.id === selected);
      navigate(role.route);
    }
  }, [view, selected, navigate]);

  const handleBack = useCallback(() => {
    setSelected(null);
    setView('select');
  }, []);

  const currentOptions = view === 'select' ? SELECT_OPTIONS : ROLE_OPTIONS;
  const isWide         = view === 'role';

  return (
    <div className="signup-page">

      {/* ── Logo & Title ── */}
      <div className="text-center mb-4">
        <div className="mb-2">
          <i className="fa-solid fa-house" style={{ fontSize: '28px', color: '#0088BD' }} />
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#0b0d2a', marginLeft: '8px' }}>
            Homiom
          </span>
        </div>
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join Saudi Arabia's leading real estate platform</p>
      </div>

      {/* ── Card ── */}
      <div className={`signup-card ${isWide ? 'wide' : ''}`}>

        {/* ── Progress Bar ── */}
        <div className="signup-progress">
          <div className="step-circle active">1</div>
          <div style={{ flex: 1, height: '3px', background: '#e0e0e0', borderRadius: '2px', minWidth: 0 }} />
          <div className={`step-circle ${view === 'role' ? 'active' : 'inactive'}`}>2</div>
        </div>

        {/* ── Step Title ── */}
        <h3 className="signup-step-title">
          {view === 'select' ? 'How will you use Homiom?' : 'Select Your Role'}
        </h3>
        <p className="signup-step-subtitle">
          {view === 'select'
            ? 'Choose the option that best describes you'
            : 'Choose the account type that best describes you'
          }
        </p>

        {/* ── Options ── */}
        <div className={`signup-options ${isWide ? 'three-col' : ''}`}>
          {currentOptions.map(option => (
            <OptionCard
              key={option.id}
              option={option}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="signup-footer">
          <span>
            {view === 'select' ? (
              <>
                Already have an account?{' '}
                <Link to="/auth/join">Login</Link>
              </>
            ) : (
              <span className="signup-back" onClick={handleBack}>
                <i className="fa-solid fa-arrow-left me-1" /> Back
              </span>
            )}
          </span>
          <button
            className={`signup-continue-btn ${selected ? 'ready' : ''}`}
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue <i className="fa-solid fa-arrow-right" />
          </button>
        </div>

      </div>

      {/* ── Terms ── */}
      <p className="signup-terms">
        By signing up, you agree to our{' '}
        <Link to="/terms">Terms of Service</Link>
        {' '}and{' '}
        <Link to="/privacy">Privacy Policy</Link>
      </p>

    </div>
  );
}