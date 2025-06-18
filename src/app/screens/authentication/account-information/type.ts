import { PATTERN_PHONE } from '@/library/components/parsed-text/utils';
import { SubmitHandler, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';

export type RadioSelectGenderProps = {
  onPress?: () => void;
  selected: boolean;
  text: I18nKeys;
};

export type SelectGenderProps = {
  setValue: UseFormSetValue<FormType>;
  watch: UseFormWatch<FormType>;
};

export type FormUpdateUserProps = {
  onSubmit?: SubmitHandler<FormType>;
  isPending: boolean;
};

export type FormType = z.infer<typeof schema>;

export const schema = z.object({
  email: z
    .string({
      required_error: 'validation:email_required',
    })
    .email()
    .optional(),
  name: z.string({
    required_error: 'validation:full_name_required',
  }),
  gender: z.string({
    required_error: 'validation:gender_required',
  }),
  birth: z.string().optional(),
  phone: z
    .string({
      required_error: 'validation:phone_required',
    })
    .regex(PATTERN_PHONE, 'validation:phone_invalid'),
});
