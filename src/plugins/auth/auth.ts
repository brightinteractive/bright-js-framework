/**
 * Represents an authentication token that can be used by the app to access resources on behalf of a user
 */
export interface Token {
  /**
   * The token as a String
   */
  value: string
  /**
   * When the token expires
   */
  expiresAt?: Date
}

/**
 * Contains information about the current authentication information available.
 */
export interface AuthTokenState {
  token?: Token
}

/**
 * Actions that can be performed on an AuthToken in the in-memory store
 */
export interface AuthTokenActions {
  /**
   * Removes the previous value and exposes the new value to anything using it
   */
  update(token: Token): void

  /**
   * Clears the current value
   */
  clear(): void
}
