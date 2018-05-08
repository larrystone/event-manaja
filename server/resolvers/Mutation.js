import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../utils/auth';
import { validateSignUp, validateSignIn } from '../utils/validator';

/**
 * Sign Up new user
 *
 * @param {Object} parent
 * @param {Object} args
 * @param {Object} context
 *
 * @returns {Object} userDetails
 */
async function signUp(parent, args, context) {
  const validation = validateSignUp(args);

  if (!validation.isValid) {
    throw new Error(JSON.stringify(validation.errors));
  }

  const password = await bcrypt.hash(args.password, 10);

  const user = await context.db.mutation.createUser({
    data: { ...validation.user, password }
  }, '{id}');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);


  return {
    token,
    user
  };
}

/**
 * Sign In new user
 *
 * @param {Object} parent
 * @param {Object} args
 * @param {Object} context
 *
 * @returns {Object} userDetails
 */
async function signIn(parent, args, context) {
  const validation = validateSignIn(args);

  if (!validation.isValid) {
    throw new Error(JSON.stringify(validation.errors));
  }

  const user = await context.db.query.users({
    where: {
      OR: [
        { email: args.authName },
        { username: args.authName }
      ]
    }
  }, '{ id password }');

  if (user.length === 0) {
    throw new Error('Invalid log in credentials');
  }

  const valid = await bcrypt.compare(args.password, user[0].password);

  if (!valid) {
    throw new Error('Invalid log in credentials');
  }

  const token = jwt.sign({ userId: user[0].id }, APP_SECRET);

  return {
    token,
    user: user[0]
  };
}

export default {
  signIn,
  signUp
};
