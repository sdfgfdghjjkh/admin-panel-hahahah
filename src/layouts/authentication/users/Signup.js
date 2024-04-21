import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { CircularProgress, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import BasicLayout from "layouts/authentication/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupUser, setSignupUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupUser.email,
        signupUser.password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        email: signupUser.email,
        password: signupUser.password,
        uid: user.uid,
        role: "admin",
      });

      navigate("/login");
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Регистрация
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {signupError && (
            <MDBox mb={2} p={1}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: true,
                  sx: {
                    "& input": {
                      color: "red",
                    },
                  },
                }}
                error
                label="Ошибка"
                value={signupError}
                variant="standard"
              />
            </MDBox>
          )}
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                value={signupUser.email}
                onChange={(e) =>
                  setSignupUser({ ...signupUser, email: e.target.value })
                }
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                value={signupUser.password}
                onChange={(e) =>
                  setSignupUser({ ...signupUser, password: e.target.value })
                }
                type="password"
                label="Пароль"
                variant="standard"
                fullWidth
                required
              />
            </MDBox>
            <MDBox
              mt={4}
              mb={1}
              sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <CircularProgress
                  size={30}
                  sx={{
                    color: green[500],
                    justifyContent: "center",
                  }}
                />
              ) : (
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                  onClick={handleSignup}
                >
                  Зарегистрироваться
                </MDButton>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Signup;
