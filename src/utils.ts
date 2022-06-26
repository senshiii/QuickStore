import { nanoid } from "nanoid";

export function checkPasswordStrength(password: string): "strong" | "weak" {
  if (
    !/[A-Z]/i.test(password) ||
    !/[a-z]/i.test(password) ||
    !/[0-9]/i.test(password)
  )
    return "weak";

  return "strong";
}

export function id() {
  return nanoid();
}

export function storagePercentageCalc(usedSpace: number, totalSpace: number) {
  if (usedSpace == 0) return 100;
  else if (usedSpace > 0) {
    const spaceLeft = totalSpace - usedSpace;
    return Math.round((spaceLeft / totalSpace) * 100);
  }
}
