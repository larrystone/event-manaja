import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const { APP_SECRET } = process.env;

export const getUserId = (context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
};
