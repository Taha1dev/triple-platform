import { z } from "zod";

const dateSchema = z.string().refine(
  (value) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) return false;
    const [month, day, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  },
  {
    message: 'Date must be in the format MM/DD/YYYY and be a valid date.',
  }
);
export const emailSchema = z.object({
  email: z.string().email('Invalid email address')
})


export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, *, ?).'
  // ),
});
export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, *, ?).'
    ),
})
export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const RegisterSchema = z.object({
  fname: z.string().min(2, 'First name must be at least 2 characters'),
  lname: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  contact_number: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, *, ?).'
  // )
  ,
  dob: dateSchema
})
export const DialogSchema = z.object({
  email: z.string().email('Invalid email address'),
})