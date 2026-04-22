import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { USERS_URLs } from '../../../../constants/EndPoints.js';
import { apiKey, EmailValidation, PasswordValidation } from '../../../../constants/Validations.js';

import '../../../AuthModule/auth.css';

// ─── Constants ────────────────────────────────────────────────────────────────
const browserLanguage = navigator.language || 'en';

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NormalSignUp() {

  const [isPasswordVisible,        setIsPasswordVisible]        = useState(false);
  const [isConfirmPasswordVisible,  setIsConfirmPasswordVisible] = useState(false);
  const [isSubmitting,             setIsSubmitting]             = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Creating your account...');

    try {
      const response = await axios.post(USERS_URLs.Register, {
        firstName: data.firstName,
        lastName:  data.lastName,
        email:     data.email,
        phone:     data.phone,
        password:  data.password,
      }, {
        headers: {
          Authorization: '',
          apiKey,
          'Content-Type': 'application/json',
          'Accept-Language': browserLanguage,
        },
      });

      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
      }

      toast.update(toastId, {
        render: 'Account created successfully! 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      setTimeout(() => navigate('/home'), 500);
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || 'Registration failed. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  return (
    <div className="normal-signup-page">

      {/* ── Logo ── */}
      <div className="text-center mb-4">
        <div className="mb-2">
          <i className="fa-solid fa-house" style={{ fontSize: '28px', color: '#0088BD' }} />
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#0b0d2a', marginLeft: '8px' }}>
            Homiom
          </span>
        </div>
        <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#0b0d2a', marginBottom: '4px' }}>
          Create Your Account
        </h2>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Join Saudi Arabia's leading real estate platform
        </p>
      </div>

      <div className="normal-signup-card">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

          {/* ── Section Title ── */}
          <p className="normal-signup-section-title">Account Details</p>
          <p className="normal-signup-section-subtitle">Fill in your information to create your account</p>

          <Row className="g-1">

            {/* ── Full Name ── */}
            <Col md={6}>
              <label className="normal-signup-label">First Name *</label>
              <input
                className={`normal-signup-input ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="Ahmed"
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && <p className="normal-signup-error">{errors.firstName.message}</p>}
            </Col>

            <Col md={6}>
              <label className="normal-signup-label">Last Name *</label>
              <input
                className={`normal-signup-input ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="Mohammed"
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && <p className="normal-signup-error">{errors.lastName.message}</p>}
            </Col>

            {/* ── Email ── */}
            <Col md={6}>
              <label className="normal-signup-label">Email Address *</label>
              <input
                type="email"
                className={`normal-signup-input ${errors.email ? 'is-invalid' : ''}`}
                placeholder="ahmed@example.com"
                {...register('email', EmailValidation)}
              />
              {errors.email && <p className="normal-signup-error">{errors.email.message}</p>}
            </Col>

            {/* ── Phone ── */}
            <Col md={6}>
              <label className="normal-signup-label">Phone Number *</label>
              <input
                className={`normal-signup-input ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="+966 50 123 4567"
                {...register('phone', { required: 'Phone number is required' })}
              />
              {errors.phone && <p className="normal-signup-error">{errors.phone.message}</p>}
            </Col>

            {/* ── Password ── */}
            <Col md={6}>
              <label className="normal-signup-label">Password *</label>
              <div className="normal-signup-password-wrapper">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  className={`normal-signup-input ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  {...register('password', PasswordValidation)}
                />
                <button type="button" className="normal-signup-toggle-eye"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setIsPasswordVisible(v => !v)}>
                  <i className={isPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} />
                </button>
              </div>
              {errors.password && <p className="normal-signup-error">{errors.password.message}</p>}
            </Col>

            {/* ── Confirm Password ── */}
            <Col md={6}>
              <label className="normal-signup-label">Confirm Password *</label>
              <div className="normal-signup-password-wrapper">
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  className={`normal-signup-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: val => val === watch('password') || 'Passwords do not match',
                  })}
                />
                <button type="button" className="normal-signup-toggle-eye"
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setIsConfirmPasswordVisible(v => !v)}>
                  <i className={isConfirmPasswordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} />
                </button>
              </div>
              {errors.confirmPassword && <p className="normal-signup-error">{errors.confirmPassword.message}</p>}
            </Col>

          </Row>

          {/* ── Footer ── */}
          <div className="normal-signup-footer">
            <button
              type="button"
              className="normal-signup-btn-back"
              onClick={() => navigate('/auth/join/signup')}
            >
              <i className="fa-solid fa-arrow-left" /> Back
            </button>

            <button type="submit" className="normal-signup-btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

        </form>
      </div>

      {/* ── Terms ── */}
      <p className="normal-signup-terms">
        By signing up, you agree to our{' '}
        <Link to="/terms">Terms of Service</Link>
        {' '}and{' '}
        <Link to="/privacy">Privacy Policy</Link>
      </p>

    </div>
  );
}