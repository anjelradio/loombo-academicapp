import 'package:flutter/material.dart';

class MainEmptyStateCard extends StatelessWidget {
  const MainEmptyStateCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 180,
      height: 180,
      decoration: BoxDecoration(
        color: const Color(0xFFE9EDF3),
        borderRadius: BorderRadius.circular(20),
      ),
      child: const Icon(Icons.school, size: 78, color: Color(0xFFB3BBC7)),
    );
  }
}
