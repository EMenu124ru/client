/**
 * Needed arguments to registration.
 */
export interface RegisterArguments {

  /** Phone number. */
  readonly phoneNumber: string;

  /** Password. */
  readonly password: string;

  /** First name. */
  readonly firstName: string;

  /** Second name. */
  readonly secondName: string;
}
