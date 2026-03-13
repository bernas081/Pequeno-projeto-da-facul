import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    // O regex abaixo verifica se existe pelo menos um caractere que NÃO é letra ou número
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um símbolo (ex: @, #, $)")
});