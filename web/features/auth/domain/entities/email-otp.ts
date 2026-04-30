export type RequestEmailOtpInfo = {
  message: string;
  expiresInSeconds: number;
};

export type VerifyEmailOtpInfo = {
  message: string;
  emailChangeToken: string;
  expiresInSeconds: number;
};
