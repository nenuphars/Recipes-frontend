import z from 'zod';

const LoginSchema = z.object({
  user_name: z.string().min(1, 'Please enter your user name'),
  password: z.string().min(1, 'Please enter your password'),
});

export default LoginSchema;
