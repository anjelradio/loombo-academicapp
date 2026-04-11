import 'package:mobile/features/auth/auth.dart';

class AuthRepository {
  AuthRepository({required AuthApi authApi}) : _authApi = authApi;
  final AuthApi _authApi;

  Future<User> login(String email, String password) {
    return _authApi.login(email, password);
  }

  Future<User> register(
    String firstName,
    String lastName,
    String email,
    String password,
  ) {
    return _authApi.register(firstName, lastName, email, password);
  }

  Future<User> checkAuthStatus(String token) {
    return _authApi.checkAuthStatus(token);
  }

  Future<User> updatePersonalInfo(
    String token,
    String firstName,
    String lastName,
  ) {
    return _authApi.updatePersonalInfo(token, firstName, lastName);
  }

  Future<void> requestEmailOtp(String token) {
    return _authApi.requestEmailOtp(token);
  }

  Future<String> verifyEmailOtp(String token, String otp) {
    return _authApi.verifyEmailOtp(token, otp);
  }

  Future<User> updateEmail(
    String token,
    String newEmail,
    String emailChangeToken,
  ) {
    return _authApi.updateEmail(token, newEmail, emailChangeToken);
  }

  Future<void> updatePassword(
    String token,
    String currentPassword,
    String newPassword,
    String confirmNewPassword,
  ) {
    return _authApi.updatePassword(
      token,
      currentPassword,
      newPassword,
      confirmNewPassword,
    );
  }
}
