type ExtendedWindow = Window & typeof globalThis & {
    chaport?: {
        q: (methodName: string) => void; 
    };
    ym?: (id: number, hitType: string, url: string, options?: object) => void;
    isTestEnvironment: boolean;
    juicyLabConfig?: { completeButton: string };
    juicyScoreApi?: any;
    jslabApi?: any;
    recaptchaVerifier?: any;
    confirmationResult?: any;
}
