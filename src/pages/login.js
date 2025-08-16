import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firestore/Config";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");     // ✅ state للبريد
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // ✅ صح
      navigate("/dashboard"); 
    } catch (err) {
      setError("البريد أو كلمة السر غير صحيحة");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" gutterBottom>
          تسجيل الدخول
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="البريد الإلكتروني"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}                            // ✅ استخدم email
            onChange={(e) => setEmail(e.target.value)} // ✅ حدّث email
          />
          <TextField
            label="كلمة المرور"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            دخول
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
