import { accountApi } from "../api/account-api";

export const accountRepository = {
  requestEmailOtp() {
    return accountApi.requestEmailOtp();
  },

  verifyEmailOtp(data: unknown) {
    return accountApi.verifyEmailOtp(data);
  },

  updateEmail(data: unknown) {
    return accountApi.updateEmail(data);
  },

  updatePassword(data: unknown) {
    return accountApi.updatePassword(data);
  },

  updateProfileInfo(data: unknown) {
    return accountApi.updateProfileInfo(data);
  },
};
