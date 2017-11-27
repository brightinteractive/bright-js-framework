/**
 * Interface that can be used to hook up to an identity provider.
 *
 * The provider needs to implement all of these methods, which will be used by the authentication plugin to feed information to the rest of the application
 */
export interface AuthClient {
  /**
   * Get the current authentication token
   *
   * This client should be responsible for not returning an invalid token
   *
   * E.g. Should not return an expired token
   */
  getToken(): string | null

  /**
   * Clears the authentication context.
   *
   * If applicable, should clear both local and remotely. (I.e. the stored token, and clear any sessions with the auth provider)
   */
  logout(): void
}

/**
 * Interface provided to the application to manage authentication state
 */
export interface AuthManager {
  /**
   * Get the current authentication token from the authentication provider (or a cache)
   *
   * If the token is expired or is not present, this will return null
   */
  getToken(): string | null

  /**
   * Clears the authentication context.
   *
   * If applicable, should clear both local and remotely. (I.e. the stored token, and clear any sessions with the auth provider)
   */
  logout(): void
}
