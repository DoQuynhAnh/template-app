/* eslint-disable sortKeysFix/sort-keys-fix */
import type { SubmitHandler } from 'react-hook-form';

import { z } from 'zod';

export const schema = z.object({
  reason: z
    .string({
      required_error: 'validation:reason_required',
    })
    .nonempty('validation:reason_required'),
  detail: z
    .string({
      required_error: 'validation:details_required',
    })
    .nonempty('validation:details_required'),
});

export type FormType = z.infer<typeof schema>;

export type FormProps = {
  onSubmit?: SubmitHandler<FormType>;
};
