import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { login } from "../api";
import { useAuthForm } from "../hooks/useAuthForm";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    msg,
    setMsg,
    handleSubmit,
  } = useAuthForm(login);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 360, m: "auto", mt: 8 }}
      >
        <Typography variant="h5" gutterBottom>
          Вход
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="E-mail"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Пароль"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Войти
        </Button>
      </Box>

      <Snackbar
        open={!!msg}
        onClose={() => setMsg(null)}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {msg ? (
          <Alert
            severity={msg.type}
            onClose={() => setMsg(null)}
            sx={{ width: "100%" }}
          >
            {msg.text}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}
