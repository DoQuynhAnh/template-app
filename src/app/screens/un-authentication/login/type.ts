import type { SubmitHandler } from 'react-hook-form';

import { z } from 'zod';

export const schema = z.object({
  username: z.string({
    required_error: 'validation:username_required',
  }).nonempty('validation:username_required'),
  password: z
    .string({
      required_error: 'validation:password_required',
    }).nonempty('validation:password_required')
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};
