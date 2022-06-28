import { FieldValue } from "firebase/firestore";
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

export function generateId() {
  return nanoid();
}

export function storagePercentageCalc(usedSpace: number, totalSpace: number) {
  if (usedSpace == 0) return 100;
  else if (usedSpace > 0) {
    const spaceLeft = totalSpace - usedSpace;
    return ((spaceLeft / totalSpace) * 100).toFixed(2);
  }
}

export function bytesToMegaBytes(bytes: number) {
  return parseInt((bytes / 1000000).toFixed(2));
}

export function isFileImage(fileType: string) {
  return ["jpeg", "jpg", "png", "gif"].includes(fileType.trim().toLowerCase());
}

export function convertFirebaseTimestamptoDate(timestamp: {
  nanoseconds: number;
  seconds: number;
}) {
  return new Date(timestamp.seconds * 1000);
}
