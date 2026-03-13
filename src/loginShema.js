// src/loginShema.js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um símbolo"),
  // Adicionamos a validação do captcha
  captchaToken: z.string().min(1, "Por favor, verifique que você não é um robô")
});