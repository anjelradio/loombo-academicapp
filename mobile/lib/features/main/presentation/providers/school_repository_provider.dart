import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/features/auth/auth.dart';
import 'package:mobile/features/main/data/api/school_api.dart';
import 'package:mobile/features/main/data/repositories/school_repository.dart';

final schoolApiProvider = Provider<SchoolApi>((ref) {
  final accessToken = ref.watch(
    authProvider.select((state) => state.user?.token ?? ''),
  );

  return SchoolApi(accessToken: accessToken);
});

final schoolRepositoryProvider = Provider<SchoolRepository>((ref) {
  final schoolApi = ref.watch(schoolApiProvider);
  return SchoolRepository(schoolApi: schoolApi);
});
