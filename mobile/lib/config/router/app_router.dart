import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/config/router/app_router_notifier.dart';
import 'package:mobile/features/auth/auth.dart';
import 'package:mobile/features/introduction/tutorial.dart';
import 'package:mobile/features/main/main.dart';
import 'package:mobile/features/profile/profile.dart';

final goRouterProvider = Provider((ref) {
  final goRouterNotifier = ref.read(goRouterNotifierProvider);
  return GoRouter(
    initialLocation: '/check',
    refreshListenable: goRouterNotifier,
    routes: [
      // Checking auth
      GoRoute(
        path: '/check',
        builder: (context, state) => const CheckAuthStatusScreen(),
      ),

      // Home placeholder
      GoRoute(path: '/', builder: (context, state) => const MainScreen()),

      // Introduction
      GoRoute(
        path: '/introduction',
        builder: (context, state) => const AppIntroductionScreen(),
      ),

      // Auth Routes
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: '/profile/personal-data',
        builder: (context, state) => const PersonalDataScreen(),
      ),
      GoRoute(
        path: '/join/school-code',
        builder: (context, state) => const JoinSchoolCodeScreen(),
      ),
    ],
    redirect: (context, state) {
      final isGoingTo = state.matchedLocation;
      final authStatus = goRouterNotifier.authStatus;

      if (authStatus == AuthStatus.checking) {
        return isGoingTo == '/check' ? null : '/check';
      }

      if (authStatus == AuthStatus.notAuthenticated) {
        if (isGoingTo == '/login' ||
            isGoingTo == '/register' ||
            isGoingTo == '/introduction') {
          return null;
        }
        return '/introduction';
      }

      if (authStatus == AuthStatus.authenticated) {
        if (isGoingTo == '/login' ||
            isGoingTo == '/register' ||
            isGoingTo == '/check' ||
            isGoingTo == '/introduction') {
          return '/';
        }
      }
      return null;
    },
  );
});
