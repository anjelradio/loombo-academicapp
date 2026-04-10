import 'package:flutter/material.dart';
import 'package:mobile/features/main/presentation/widgets/widgets.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int selectedTab = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF1F4F8),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButton: MainJoinButton(onPressed: () {}),
      bottomNavigationBar: MainBottomTabs(
        selectedIndex: selectedTab,
        onTabChanged: (index) => setState(() => selectedTab = index),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const MainHeader(),
              const SizedBox(height: 34),
              const Center(child: MainEmptyStateCard()),
              const SizedBox(height: 34),
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 320),
                  child: Text(
                    'Bienvenido a LoomBo',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 340),
                  child: Text(
                    selectedTab == 0
                        ? 'Aqui apareceran tus colegios vinculados. Comienza usando el boton inferior para unirte a una institucion.'
                        : 'Aqui apareceran tus estudiantes vinculados. Comienza usando el boton inferior para unirte a una institucion.',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF4B5563),
                      height: 1.45,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
