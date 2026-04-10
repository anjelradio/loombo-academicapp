import 'package:mobile/features/auth/domain/domain.dart';

class UserMapper {
  static User userJsonToEntity(Map<String, dynamic> json) {
    final userJson = json['user'];

    return User(
      id: userJson['id'],
      firstName: userJson['first_name'],
      lastName: userJson['last_name'],
      email: userJson['email'],
      token: json['access_token'],
    );
  }
}
