export default function getPasswordValidity(newPassword = '') {
  const strength: Record<string, boolean> = {
    length: newPassword.length >= 8,
    digit: /[0-9]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    specialChar: /[!@#%^&*]/.test(newPassword),
  };
  return Object.keys(strength).filter((key) => strength[key]).length;
}
