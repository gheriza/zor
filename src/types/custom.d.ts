// Declarations for 'validator'
declare module 'validator' {
    export function isEmail(email: string): boolean;
    export function isStrongPassword(password: string): boolean;
    export function isURL(url: string): boolean;
    // Add other functions as needed
  }
  
  // Declarations for 'zxcvbn'
  declare module 'zxcvbn' {
    interface ZXCVBNResult {
      score: number;
      feedback: {
        suggestions: string[];
      };
    }
  
    export default function zxcvbn(password: string): ZXCVBNResult;
  }
  
  // Declarations for 'react-google-recaptcha'
  declare module 'react-google-recaptcha' {
    import * as React from 'react';
  
    export interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (token: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      size?: 'normal' | 'compact' | 'invisible';
      theme?: 'light' | 'dark';
      type?: 'image' | 'audio';
      tabindex?: number;
      hl?: string;
      badge?: 'bottomright' | 'bottomleft' | 'inline';
    }
  
    export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {}
  }