/* eslint-disable sortKeysFix/sort-keys-fix */
import { PATTERN_PHONE } from '@/library/components/parsed-text/utils';
import type { SubmitHandler } from 'react-hook-form';

import { z } from 'zod';

export const schema = z.object({
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
  province: z
    .string({
      required_error: 'validation:city_required',
    })
    .nonempty('validation:city_required'),
  districts: z
    .string({
      required_error: 'validation:district_required',
    })
    .nonempty('validation:district_required'),
  wards: z
    .string({
      required_error: 'validation:ward_required',
    })
    .nonempty('validation:ward_required'),
  specificAddress: z
    .string({
      required_error: 'validation:address_detail_required',
    })
    .nonempty('validation:address_detail_required'),
});

export type FormType = z.infer<typeof schema>;

export type FormProps = {
  onSubmit?: SubmitHandler<FormType>;
};
