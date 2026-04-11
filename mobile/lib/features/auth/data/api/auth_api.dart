import 'package:dio/dio.dart';
import 'package:mobile/config/config.dart';
import 'package:mobile/features/auth/data/data.dart';
import 'package:mobile/features/auth/domain/domain.dart';
import 'package:mobile/features/shared/shared.dart';

class AuthApi {
  AuthApi({Dio? dio})
    : _dio = dio ?? Dio(BaseOptions(baseUrl: Environment.apiUrl));

  final Dio _dio;

  Never _throwParsedDioError(DioException error, String fallbackMessage) {
    if (error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.connectionError) {
      throw CustomError('Revisa tu conexion a internet');
    }

    final messages = parseApiErrors(error.response?.data);
    if (messages.isNotEmpty) {
      throw CustomError.multiple(messages);
    }

    throw CustomError(fallbackMessage);
  }

  Future<User> checkAuthStatus(String token) async {
    try {
      final response = await _dio.post(
        '/auth/check-status/',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      return UserMapper.userJsonToEntity(response.data);
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible validar la sesion');
    } catch (_) {
      throw CustomError('No fue posible validar la sesion');
    }
  }

  Future<User> login(String email, String password) async {
    try {
      final response = await _dio.post(
        'auth/login',
        data: {'email': email, 'password': password},
      );
      return UserMapper.userJsonToEntity(response.data);
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible iniciar sesion');
    } catch (_) {
      throw CustomError('No fue posible iniciar sesion');
    }
  }

  Future<User> register(
    String firstName,
    String lastName,
    String email,
    String password,
  ) async {
    try {
      final response = await _dio.post(
        'auth/register',
        data: {
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password,
        },
      );
      return UserMapper.userJsonToEntity(response.data);
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible registrarse');
    } catch (_) {
      throw CustomError('No fue posible registrarse');
    }
  }

  Future<User> updatePersonalInfo(
    String token,
    String firstName,
    String lastName,
  ) async {
    try {
      final response = await _dio.patch(
        '/users/me/profile',
        data: {'first_name': firstName, 'last_name': lastName},
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      return UserMapper.userJsonWithoutTokenToEntity(
        Map<String, dynamic>.from(response.data),
        token: token,
      );
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible actualizar los datos');
    } catch (_) {
      throw CustomError('No fue posible actualizar los datos');
    }
  }

  Future<void> requestEmailOtp(String token) async {
    try {
      await _dio.post(
        '/users/me/email/request-otp',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible enviar el codigo OTP');
    } catch (_) {
      throw CustomError('No fue posible enviar el codigo OTP');
    }
  }

  Future<String> verifyEmailOtp(String token, String otp) async {
    try {
      final response = await _dio.post(
        '/users/me/email/verify-otp',
        data: {'otp': otp},
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      return EmailChangeMapper.emailChangeTokenFromJson(
        Map<String, dynamic>.from(response.data),
      );
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible verificar el codigo OTP');
    } catch (_) {
      throw CustomError('No fue posible verificar el codigo OTP');
    }
  }

  Future<User> updateEmail(
    String token,
    String newEmail,
    String emailChangeToken,
  ) async {
    try {
      final response = await _dio.patch(
        '/users/me/email',
        data: {'new_email': newEmail, 'email_change_token': emailChangeToken},
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      return UserMapper.userJsonWithoutTokenToEntity(
        Map<String, dynamic>.from(response.data),
        token: token,
      );
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible actualizar el correo');
    } catch (_) {
      throw CustomError('No fue posible actualizar el correo');
    }
  }

  Future<void> updatePassword(
    String token,
    String currentPassword,
    String newPassword,
    String confirmNewPassword,
  ) async {
    try {
      await _dio.patch(
        '/users/me/password',
        data: {
          'current_password': currentPassword,
          'new_password': newPassword,
          'confirm_new_password': confirmNewPassword,
        },
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );
    } on DioException catch (e) {
      _throwParsedDioError(e, 'No fue posible actualizar la contraseña');
    } catch (_) {
      throw CustomError('No fue posible actualizar la contraseña');
    }
  }
}
