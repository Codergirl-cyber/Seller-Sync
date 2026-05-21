import { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const applySession = (session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    };

    // Restore session from storage immediately (persistSession: true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session);
      if (mounted) setInitializing(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
      if (mounted) setInitializing(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const signUp = async (email, password) => {
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      throw signUpError;
    }

    // Session exists when email confirmation is off; otherwise user confirms via email
    if (data.session) {
      setUser(data.session.user);
    }

    return data;
  };

  const signInWithPassword = async (email, password) => {
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      throw signInError;
    }

    setUser(data.user);
    return data;
  };

  const signInWithGoogle = async () => {
    setError(null);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      throw oauthError;
    }
  };

  const resetPassword = async (email) => {
    setError(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (resetError) {
      setError(resetError.message);
      throw resetError;
    }
  };

  const signOut = async () => {
    setError(null);

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
      throw signOutError;
    }

    setUser(null);
  };

  const value = {
    user,
    initializing,
    loading: initializing,
    error,
    clearError,
    signUp,
    signInWithPassword,
    signInWithGoogle,
    resetPassword,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
