import trimWhiteSpace from './trimWhiteSpace';

const isTextTooLong = (text, maxLength) => text.length > maxLength;

const emailPattern = /\S{3,}@\S{2,}\.\S{2,}/;

export const validateSignUp = ({
  name, username, email, password
}) => {
  let validation = {
    isValid: true,
    errors: {},
    user: {
      name: trimWhiteSpace(name, ' '),
      username: trimWhiteSpace(username),
      email: trimWhiteSpace(email),
      password,
    }
  };

  if (password.length < 6 || isTextTooLong(validation.user.name, 100)) {
    validation = {
      ...validation,
      isValid: false,
      errors: {
        ...validation.errors,
        password: 'Password must be between 6 to 100 characters long'
      }
    };
  }

  if (validation.user.name.length < 6 ||
    isTextTooLong(validation.user.name, 100)) {
    validation = {
      ...validation,
      isValid: false,
      errors: {
        ...validation.errors,
        name: 'Name must be between 6 to 100 characters long'
      }
    };
  }

  if (validation.user.username.length < 5 ||
    isTextTooLong(validation.user.username, 50)) {
    validation = {
      ...validation,
      isValid: false,
      errors: {
        ...validation.errors,
        username: 'Username must be between 5 to 50 characters long!'
      }
    };
  }

  if (!emailPattern.test(validation.user.email)) {
    return {
      isValid: false,
      errors: {
        ...validation.errors,
        email: 'Invalid email address'
      }
    };
  }

  return validation;
};

export const validateSignIn = ({ authName, password }) => {
  if (trimWhiteSpace(authName).length === 0 || password.length === 0) {
    return {
      isValid: false,
      errors: {
        fields: 'Empty field(s) are not allowed'
      }
    };
  }

  return {
    isValid: true,
  };
};
