import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react"; // 1. Importar o useRef
import { loginSchema } from "./loginShema";
import "./Login.css";

function Login() {
  // 2. Criar a "referência" para o Captcha
  const captchaRef = useRef(null);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onCaptchaChange = (token) => {
    setValue("captchaToken", token || "");
  };

  const onSubmit = async (data) => {
    try {
      // Simulação de chamada de API
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = new Error(`Erro HTTP: ${response.status}`);
        errorData.status = response.status;
        throw errorData;
      }

      await Swal.fire({
        title: "Sucesso!",
        text: "Login realizado com sucesso!",
        icon: "success",
        confirmButtonColor: "#0066ff",
      });

      // --- LIMPEZA COMPLETA ---
      reset(); // Limpa e-mail e senha
      
      if (captchaRef.current) {
        captchaRef.current.reset(); // 3. Reseta o componente visual do Captcha
      }
      // ------------------------

    } catch (error) {
      const statusCode = error.status || 500;
      Swal.fire({
        title: `Erro Técnico ${statusCode}`,
        text: "Falha na autenticação.",
        icon: "error",
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Fazer Login</h1>

        <div className="input-group">
          <label>E-mail</label>
          <input type="text" placeholder="seu@email.com" {...register("email")} />
          {errors.email && <span className="error-msg">{errors.email.message}</span>}
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input type="password" placeholder="********" {...register("password")} />
          {errors.password && <span className="error-msg">{errors.password.message}</span>}
        </div>

        <div className="captcha-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReCAPTCHA
            ref={captchaRef} // 4. Conectar a referência ao componente
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onCaptchaChange}
            theme="dark"
          />
          {errors.captchaToken && <span className="error-msg">{errors.captchaToken.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Autenticando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;