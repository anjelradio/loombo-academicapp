class EmailChangeMapper {
  static String emailChangeTokenFromJson(Map<String, dynamic> json) {
    final token = json['email_change_token'];
    if (token is String && token.trim().isNotEmpty) return token;
    throw const FormatException('Token de cambio de correo invalido');
  }
}
