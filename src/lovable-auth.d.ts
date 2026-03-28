// Type augmentation to fix auto-generated lovable auth type mismatch
declare module "@lovable.dev/cloud-auth-js" {
  type OAuthProvider = "google" | "apple" | "microsoft";
  
  interface SignInWithOAuthOptions {
    redirect_uri?: string;
    extraParams?: Record<string, string>;
  }

  interface OAuthTokens {
    access_token: string;
    refresh_token: string;
  }

  type SignInWithOAuthResult = {
    tokens: OAuthTokens;
    error: null;
    redirected?: false;
  } | {
    tokens?: undefined;
    error: Error;
    redirected?: false;
  } | {
    tokens?: undefined;
    error: null;
    redirected: true;
  };

  interface LovableAuth {
    signInWithOAuth: (provider: OAuthProvider, opts?: SignInWithOAuthOptions) => Promise<SignInWithOAuthResult>;
  }

  interface LovableAuthConfig {
    oauthBrokerUrl?: string;
    supportedOAuthOrigins?: string[];
  }

  function createLovableAuth(config?: LovableAuthConfig): LovableAuth;
}
