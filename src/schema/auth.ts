import { z } from "zod";

export const formRegister = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

export type FormRegister = z.infer<typeof formRegister>;

export const formLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type FormLogin = z.infer<typeof formLogin>;
