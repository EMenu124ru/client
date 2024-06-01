interface PhoneNumberValidators {
  [key: string]: RegExp;
}
export const phoneNumberValidators: PhoneNumberValidators = {
    ru: /^(\+?7|8)?9\d{9}$/i,
};
