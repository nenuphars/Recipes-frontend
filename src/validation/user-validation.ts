import { z } from 'zod';

const UserSchema = z.object({
  user_name: z.string().min(3, 'User name must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default UserSchema;
