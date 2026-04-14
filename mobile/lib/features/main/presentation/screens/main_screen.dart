import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/features/main/presentation/providers/providers.dart';
import 'package:mobile/features/main/presentation/widgets/widgets.dart';
import 'package:mobile/features/shared/shared.dart';

class MainScreen extends ConsumerStatefulWidget {
  const MainScreen({super.key});

  @override
  ConsumerState<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends ConsumerState<MainScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() => ref.read(schoolsProvider.notifier).loadSchools());
  }

  void _showErrorSnackbar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red.shade800),
    );
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(schoolsProvider, (previous, next) {
      final hasError = next.errorMessages.isNotEmpty;
      final previousError =
          previous != null && previous.errorMessages.isNotEmpty
          ? previous.errorMessages.first
          : null;
      final currentError = hasError ? next.errorMessages.first : null;

      if (!hasError || previousError == currentError) return;
      _showErrorSnackbar(context, currentError!);
    });

    final schoolsState = ref.watch(schoolsProvider);
    final hasSchools = schoolsState.schools.isNotEmpty;

    return Scaffold(
      backgroundColor: const Color(0xFFF1F4F8),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButton: MainJoinButton(
        onPressed: () => _openJoinOptionsSheet(context),
      ),

      // TODO: Cuando exista listado de estudiantes, mostrar tabs solo
      // si hay escuelas y estudiantes con datos.
      // bottomNavigationBar: MainBottomTabs(...)
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const MainHeader(),
              const SizedBox(height: 20),
              const AppSectionHeader(
                title: 'Mis colegios',
                subtitle:
                    'Bienvenido. Aqui puedes ver tus instituciones vinculadas.',
              ),
              const SizedBox(height: 16),
              Expanded(
                child: schoolsState.isLoading
                    ? const MainSchoolsSkeletonList()
                    : hasSchools
                    ? ListView.separated(
                        physics: const BouncingScrollPhysics(),
                        itemCount: schoolsState.schools.length,
                        separatorBuilder: (_, _) => const SizedBox(height: 14),
                        itemBuilder: (context, index) {
                          return SchoolCard(
                            school: schoolsState.schools[index],
                          );
                        },
                      )
                    : _MainEmptyState(
                        onRetry: () {
                          ref.read(schoolsProvider.notifier).loadSchools();
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _openJoinOptionsSheet(BuildContext context) async {
    await showModalBottomSheet<void>(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (sheetContext) {
        return Container(
          decoration: const BoxDecoration(
            color: Color(0xFFF5F7FA),
            borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
          ),
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 18),
          child: SafeArea(
            top: false,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Unirse o vincularse',
                  style: Theme.of(sheetContext).textTheme.titleSmall?.copyWith(
                    color: const Color(0xFF0F2C4F),
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Selecciona como quieres vincular tu cuenta.',
                  style: Theme.of(sheetContext).textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF4B5563),
                  ),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: CustomFilledButton(
                    text: 'Unirse a un colegio',
                    onPressed: () {
                      Navigator.of(sheetContext).pop();
                      context.push('/join/school-code');
                    },
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: OutlinedButton(
                    onPressed: () {
                      Navigator.of(sheetContext).pop();
                      _showErrorSnackbar(
                        context,
                        'Próximamente podrás vincularte a un estudiante.',
                      );
                    },
                    child: const Text('Vincularse a un estudiante'),
                  ),
                ),

                // TODO(jonathan): Reemplazar esta opción temporal cuando esté
                // implementado el flujo de vinculación de estudiantes.
              ],
            ),
          ),
        );
      },
    );
  }
}

class _MainEmptyState extends StatelessWidget {
  final VoidCallback onRetry;

  const _MainEmptyState({required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          children: [
            const MainEmptyStateCard(),
            const SizedBox(height: 26),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 320),
              child: Text(
                'Bienvenido a LoomBo',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleLarge,
              ),
            ),
            const SizedBox(height: 12),
            ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 340),
              child: Text(
                'Aqui apareceran tus colegios vinculados. Comienza usando el boton inferior para unirte a una institucion.',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF4B5563),
                  height: 1.45,
                ),
              ),
            ),
            const SizedBox(height: 16),
            TextButton(onPressed: onRetry, child: const Text('Reintentar')),

            // TODO: Si en el futuro hay colegios y estudiantes,
            // mostrar tabs para cambiar entre listados.
          ],
        ),
      ),
    );
  }
}
