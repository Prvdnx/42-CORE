import React, { createContext, useState, useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext(null);

const auth0Domain = `https://${process.env.EXPO_PUBLIC_AUTH0_DOMAIN}`;
const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;

const discovery = {
  authorizationEndpoint: `${auth0Domain}/authorize`,
  tokenEndpoint: `${auth0Domain}/oauth/token`,
  revocationEndpoint: `${auth0Domain}/oauth/revoke`,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start in a loading state

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'exp', // works inside Expo Go
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      extraParams: {
        audience: `${auth0Domain}/api/v2/`,
      },
    },
    discovery
  );

  // Handle login result
  useEffect(() => {
    const handleAuth = async () => {
      // The request object is null until the auth request is fully prepared.
      // We should only stop loading when the request is ready OR we have a response.
      if (!request && !response) {
        setLoading(false); // No response to process, so we're done loading.
        return;
      }

      if (response.type !== 'success') {
        console.log('Auth canceled or failed:', response);
        setLoading(false); // Auth failed or was canceled, so we're done loading.
        return;
      }

      const accessToken = response.params.access_token;

      // Fetch user profile
      const res = await fetch(`${auth0Domain}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profile = await res.json();
      setUser(profile);
      setLoading(false); // User is set, so we're done loading
    };

    handleAuth();
  }, [response]);

  const login = () => {
    setLoading(true); // Set loading to true when login starts
    promptAsync();
  };

  const logout = () => {
    setUser(null); // simple logout for Expo Go
    // Note: A full logout would also revoke the token with Auth0.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
