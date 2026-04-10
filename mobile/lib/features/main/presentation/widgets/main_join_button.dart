import 'package:flutter/material.dart';
import 'package:mobile/features/shared/widgets/custom_filled_button.dart';

class MainJoinButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const MainJoinButton({super.key, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: CustomFilledButton.defaultButtonColor,
      borderRadius: BorderRadius.circular(26),
      elevation: 6,
      shadowColor: Colors.black.withValues(alpha: 0.24),
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(26),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.add, color: Colors.white, size: 20),
              const SizedBox(width: 10),
              Text(
                'Unirse o vincular codigo',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
