import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginShema"; // Importando a validação
import "./Login.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // Simulando um delay de rede (2 segundos)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Dados Validados pelo Zod:", data);
    alert("Login realizado com sucesso!");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Fazer Login</h1>

        <div className="input-group">
          <label>E-mail</label>
          <input
            type="text" // Usamos text para o Zod validar o formato e-mail
            placeholder="seu@email.com"
            {...register("email")}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="********"
            {...register("password")}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <span className="error-msg">{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;