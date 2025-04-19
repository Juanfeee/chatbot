import {z} from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, {message: 'El usuario no es valido'}),
  password: z.string().min(1, {message: 'Este campo es requerido'}),
})