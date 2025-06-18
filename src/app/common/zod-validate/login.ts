import { FormLoginType } from '@model/authentication';
import { z } from 'zod';


export const loginValidation = z.object<ZodShape<FormLoginType>>({
  email: z.string().min(1).email(),
  password: z.string().min(1, 'Password is required'),
});
