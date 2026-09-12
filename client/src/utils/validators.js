// Validation helpers
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  return /^[0-9\s\-\+\(\)]{9,}$/.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validatePasswordStrength = (password) => {
  const strength = {
    score: 0,
    feedback: []
  };

  if (password.length >= 8) strength.score++;
  if (password.length >= 12) strength.score++;
  if (/[a-z]/.test(password)) strength.score++;
  if (/[A-Z]/.test(password)) strength.score++;
  if (/[0-9]/.test(password)) strength.score++;
  if (/[^\w]/.test(password)) strength.score++;

  if (strength.score <= 2) strength.feedback.push('Weak password');
  if (strength.score <= 4) strength.feedback.push('Moderate password');
  if (strength.score >= 5) strength.feedback.push('Strong password');

  return strength;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateMinLength = (value, length) => {
  return value && value.length >= length;
};

export const validateMaxLength = (value, length) => {
  return value && value.length <= length;
};

export const validateRange = (value, min, max) => {
  const num = parseFloat(value);
  return num >= min && num <= max;
};
