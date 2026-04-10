import 'package:dio/dio.dart';
import 'package:mobile/config/config.dart';
import 'package:mobile/features/auth/data/data.dart';
import 'package:mobile/features/auth/domain/domain.dart';

class AuthApi {
  AuthApi({Dio? dio})
    : _dio = dio ?? Dio(BaseOptions(baseUrl: Environment.apiUrl));

  final Dio _dio;
  Future<User> checkAuthStatus(String token) async {
    try {
      final response = await _dio.post(
        '/auth/check-status/',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      return UserMapper.userJsonToEntity(response.data);
    } on DioException catch (e) {
      if (e.response?.statusCode == 401) {
        throw CustomError('Token Invalido');
      }

      throw CustomError('No fue posible validar la sesion');
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
      if (e.response?.statusCode == 401) {
        throw CustomError(
          e.response?.data['detail'] ?? 'Credenciales Incorrectas',
        );
      }

      if (e.type == DioExceptionType.connectionTimeout) {
        throw CustomError('Revisa tu conexion a internet');
      }
      throw CustomError('No fue posible iniciar sesion');
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
      if (e.response?.statusCode == 400) {
        throw CustomError(
          e.response?.data['detail'] ?? 'No fue posible registrarse',
        );
      }

      if (e.type == DioExceptionType.connectionTimeout) {
        throw CustomError('Revisa tu conexion a internet');
      }
      throw CustomError('No fue posible registrarse');
    } catch (_) {
      throw CustomError('No fue posible registrarse');
    }
  }
}
