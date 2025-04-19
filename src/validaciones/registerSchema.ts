import {z} from 'zod';


export const registerSchema = z.object({
  username: z.string().min(1, {message: 'El nombre es requerido'}),
  email: z.string().email({message: 'El email no es válido'}),
  password: z.string().min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}),
  confirmPassword: z.string().min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}),
  is_profesor: z.boolean().optional(),
  is_estudiante: z.boolean().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden', 
    path: ['confirmPassword'],
  });