import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String? label;
  final String? hint;
  final String? errorMessage;
  final bool obscureText;
  final TextInputType? keyboardType;
  final Function(String)? onChanged;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;
  final Widget? prefixIcon;

  const CustomTextFormField({
    super.key,
    this.label,
    this.hint,
    this.errorMessage,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.onChanged,
    this.validator,
    this.suffixIcon,
    this.prefixIcon,
  });

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: const BorderSide(
        color: Color(0xFFE5E7EB),
        width: 1,
      ),
    );

    final focusedBorder = OutlineInputBorder(
      borderRadius: BorderRadius.circular(16),
      borderSide: BorderSide(
        color: colors.primary,
        width: 1.4,
      ),
    );

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: TextFormField(
        onChanged: onChanged,
        validator: validator,
        obscureText: obscureText,
        keyboardType: keyboardType,
        style: textTheme.bodyMedium?.copyWith(
          color: const Color(0xFF111827),
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          errorText: errorMessage,
          prefixIcon: prefixIcon,
          suffixIcon: suffixIcon,

          filled: true,
          fillColor: const Color(0xFFF9FAFB),

          contentPadding: const EdgeInsets.symmetric(
            horizontal: 18,
            vertical: 18,
          ),

          labelStyle: textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF6B7280),
            fontWeight: FontWeight.w500,
          ),

          floatingLabelStyle: textTheme.bodyMedium?.copyWith(
            color: colors.primary,
            fontWeight: FontWeight.w700,
          ),

          hintStyle: textTheme.bodyMedium?.copyWith(
            color: const Color(0xFF9CA3AF),
            fontWeight: FontWeight.w400,
          ),

          enabledBorder: border,
          focusedBorder: focusedBorder,

          errorBorder: border.copyWith(
            borderSide: const BorderSide(
              color: Color(0xFFEF4444),
              width: 1.2,
            ),
          ),

          focusedErrorBorder: focusedBorder.copyWith(
            borderSide: const BorderSide(
              color: Color(0xFFEF4444),
              width: 1.4,
            ),
          ),
        ),
      ),
    );
  }
}