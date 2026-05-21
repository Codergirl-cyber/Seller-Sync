import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/AuthPages.css';

export default function SignupPage({ onSwitchToLogin }) {
  const { signUp, signInWithGoogle, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(formData.email, formData.password);
      setSuccess(
        'Account created successfully! You can now sign in.'
      );
      setFormData({ email: '', password: '', confirmPassword: '' });
      setTimeout(() => onSwitchToLogin(), 2000);
    } catch (err) {
      // Handle specific errors
      if (err.message.includes('rate limited')) {
        setError('Too many signup attempts. Please wait a few minutes and try again, or use a different email.');
      } else if (err.message.includes('already exists')) {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(err.message || 'Signup failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = error || authError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="auth-container"
    >
      <div className="auth-box">
        {/* Header */}
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us and get started</p>
        </div>

        {/* Success Alert */}
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="success-alert"
          >
            <CheckCircle size={18} />
            <span>{success}</span>
          </motion.div>
        )}

        {/* Error Alert */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="error-alert"
          >
            <AlertCircle size={18} />
            <span>{displayError}</span>
          </motion.div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSignup} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting || loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting || loading}
              />
            </div>
            <small className="form-hint">At least 6 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isSubmitting || loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-button primary"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? (
              <>
                <Loader size={18} className="spinner" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="auth-button google"
          disabled={isSubmitting || loading}
          type="button"
        >
          {isSubmitting ? (
            <>
              <Loader size={18} className="spinner" />
              Redirecting...
            </>
          ) : (
            <>
              <svg className="google-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="auth-link"
          >
            Sign in
          </button>
        </p>
      </div>
    </motion.div>
  );
}
