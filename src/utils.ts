export function checkPasswordStrength(password: string): "strong" | "weak" {
  if (
    !/[A-Z]/i.test(password) ||
    !/[a-z]/i.test(password) ||
    !/[0-9]/i.test(password)
  )
    return "weak";

  return "strong";
}
