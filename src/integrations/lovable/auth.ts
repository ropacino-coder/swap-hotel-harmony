// Wrapper to work around auto-generated type mismatch
// The auto-generated index.ts includes "microsoft" but the package only supports "google" | "apple"
import { lovable as _lovable } from "./index";

type SupportedProvider = "google" | "apple";

export const lovableAuth = {
  signInWithOAuth: (provider: SupportedProvider, opts?: { redirect_uri?: string; extraParams?: Record<string, string> }) =>
    (_lovable.auth.signInWithOAuth as any)(provider, opts),
};
