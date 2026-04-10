class WrongCredentials implements Exception {}

class InvalidToken implements Exception {}

class ConnectionTimeOut {}

class CustomError implements Exception {
  final String message;

  CustomError(this.message);
}
