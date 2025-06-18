import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

export const schema = z
  .object({
    oldPassword: z.string({
      invalid_type_error: 'Không được để trống'
    }).nonempty('Không được để trống'),
    newPassword: z.string({
      invalid_type_error: 'Không được để trống'
    }).nonempty('Không được để trống'),
    confirmPassword: z.string({
      invalid_type_error: 'Không được để trống'
    }).nonempty('Không được để trống'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp',
    path: ['confirmPassword'],
  })
  // Kiểm tra nếu mật khẩu mới trùng với mật khẩu cũ
  .refine(data => data.newPassword !== data.oldPassword, {
    message: 'Mật khẩu mới không được trùng với mật khẩu cũ',
    // Lỗi sẽ được gắn với trường newPassword
    path: ['newPassword'],
  });

export type FormType = z.infer<typeof schema>;

export type FormChangePasswordProps = {
  onSubmit: SubmitHandler<FormType>;
  isPending: boolean
};
