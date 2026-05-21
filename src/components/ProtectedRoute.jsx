import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, onAuthRequired }) {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      onAuthRequired?.();
    }
  }, [isAuthenticated, loading, onAuthRequired]);

  // Show loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'inline-block', marginBottom: '1rem' }}
          >
            <Loader size={48} color="var(--accent)" />
          </motion.div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </motion.div>
    );
  }

  // Render children only if authenticated
  if (isAuthenticated) {
    return children;
  }

  // Return null while redirecting (the redirect happens via onAuthRequired)
  return null;
}
