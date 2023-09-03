import React from "react";
import { Formik, Form } from "formik";
import { TextInput } from "./../components/FormLib";
import {
  StyledTextInput,
  StyledFormArea,
  StyledFormButton,
  StyledLabel,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./../components/Style";
import Logo from "./../assets/Logo.png";
import { FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import * as Loader from "react-loader";

//Auth & Redux
import { connect } from "react-redux";
import { loginUser } from "./../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const handleSubmit = (values) => {
  console.log("Valores do formulário:", values);
};

const Login = ({ loginUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Login
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email Address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log(values);
            loginUser(values, navigate, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="olga1@example.com"
                icon={<FiMail />}
              />

              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="**********"
                icon={<FiLock />} // Adicione o ícone aqui
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Login</StyledFormButton>
                )}
                {isSubmitting && (
                  <Loader
                    type="ThreeDots"
                    color={colors.theme}
                    height={10}
                    width={5}
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          New Here? <TextLink to="/signup">Signup</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All Rights Reserved &copy;2023</CopyrightText>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
