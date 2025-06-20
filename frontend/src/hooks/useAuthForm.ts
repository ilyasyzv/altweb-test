import { useState, useEffect } from "react";

type Msg = { type: "success" | "error"; text: string };

export function useAuthForm(
  submit: (e: string, p: string) => Promise<Response>
) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<Msg | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rsp = await submit(email, password);

    if (!rsp.ok) {
      const { error } = await rsp.json();
      setMsg({ type: "error", text: error });
      return;
    }

    const { token } = await rsp.json();
    localStorage.setItem("token", token);
    setMsg({ type: "success", text: "success! token is saved" });
  };

  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 4000);
    return () => clearTimeout(id);
  }, [msg]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    msg,
    setMsg,
    handleSubmit
  };
}
