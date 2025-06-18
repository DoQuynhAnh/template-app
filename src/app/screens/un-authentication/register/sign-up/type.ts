import { PATTERN_PHONE } from '@/library/components/parsed-text/utils';
import type { SubmitHandler } from 'react-hook-form';

import { z } from 'zod';

export const schema = z
  .object({
    fullName: z
      .string({
        required_error: 'validation:full_name_required',
      })
      .nonempty('validation:full_name_required'),
    phoneNumber: z
      .string({
        required_error: 'validation:phone_empty',
      })
      .nonempty('validation:phone_empty')
      .regex(PATTERN_PHONE, 'validation:phone_invalid'),
    password: z
      .string()
      .nonempty('validation:password_required')
      .min(6, 'validation:new_password_min_length'),
    rePassword: z.string().nonempty('validation:password_required'),
  })
  .refine(data => data.password === data.rePassword, {
    message: 'validation:password_not_match',
    path: ['reNewPassword'],
  });

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};
