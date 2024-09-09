const oneSecond = 1000; // milliseconds
const oneMinute = 60 * oneSecond;
const oneHour = 60 * oneMinute;

const fiveMinutes = 5 * oneMinute;
const oneHourInMs = oneHour;

/**
 * Verification token expiration
 * @type {number}
 */
export const VERIFICATION_TOKEN_EXPIRATION = oneHourInMs;

/**
 * Password reset token expiration
 * @type {number}
 */
export const PASSWORD_RESET_TOKEN_EXPIRATION = oneHourInMs;

/**
 * 2FA expiration
 * @type {number}
 */
export const TWO_FACTOR_TOKEN_EXPIRATION = fiveMinutes;
