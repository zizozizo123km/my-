import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

/**
 * @typedef {object} User
 * @property {string} id - Unique user ID.
 * @property {string} name - User's display name.
 * @property {string} email - User's email address.
 * @property {string} token - Authentication token (JWT or similar).
 */

/**
 * @typedef {object} AuthContextType
 * @property {User | null} currentUser - The currently authenticated user.
 * @property {boolean} isAuthenticated - True if a user is logged in.
 * @property {boolean} loading - True during initial load or API calls (login/logout).
 * @property {string | null} error - Any authentication error message.
 * @property {(credentials: object) => Promise<void>} login - Function to handle user login.
 * @property {() => Promise<void>} logout - Function to handle user logout.
 */

// --- Constants ---
const LOCAL_STORAGE_KEY = 'ECOM_AUTH_USER';

/** @type {React.Context<AuthContextType | undefined>} */
const AuthContext = createContext(undefined);

/**
 * Provides authentication state and functions to the application.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  /** @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]} */
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Initial Load Effect ---
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // Basic validation check
        if (user && user.token) {
          setCurrentUser(user);
        }
      }
    } catch (e) {
      console.error('Failed to parse stored user data:', e);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Authentication Functions ---

  /**
   * Simulates a login API call.
   * @param {object} credentials - User credentials (e.g., { email, password }).
   * @returns {Promise<void>}
   */
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // --- Simulated API Call ---
      await new Promise(resolve => setTimeout(resolve, 800));

      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        /** @type {User} */
        const user = {
          id: 'user-123',
          name: 'John Doe',
          email: credentials.email,
          token: 'fake-jwt-token-' + Math.random().toString(36).substring(2, 15),
        };

        setCurrentUser(user);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (err) {
      setError(err.message || 'Login failed due to a network error.');
      setCurrentUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handles user logout.
   * @returns {Promise<void>}
   */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // --- Simulated API Call (e.g., token revocation) ---
      await new Promise(resolve => setTimeout(resolve, 400));

      setCurrentUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {
      // Even if logout fails on the server, we usually clear local state
      console.error('Server logout failed:', err);
      setError('Logout failed, but local session cleared.');
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Context Value Memoization ---
  /** @type {AuthContextType} */
  const value = useMemo(() => ({
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    error,
    login,
    logout,
  }), [currentUser, loading, error, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume the authentication context.
 * @returns {AuthContextType}
 * @throws {Error} If used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}