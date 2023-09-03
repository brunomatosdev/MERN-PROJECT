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
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import * as Loader from "react-loader";

//Auth & Redux
import { connect } from "react-redux";
import { signupUser } from "./../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const handleSubmit = (values) => {
  console.log("Valores do formulário:", values);
};

const Signup = ({ signupUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Signup
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            username: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email Address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
            username: Yup.string().required("Required"),
            repeatPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords must match"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            signupUser(values, navigate, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="username"
                type="text"
                label="Username"
                placeholder="Username123"
                icon={<FiUser />}
              />
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
              <TextInput
                name="repeatPassword"
                type="password"
                label="Repeat Password"
                placeholder="**********"
                icon={<FiLock />} // Adicione o ícone aqui
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Signup</StyledFormButton>
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
          Already Have an Account? <TextLink to="/login">Login</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All Rights Reserved &copy;2023</CopyrightText>
    </div>
  );
};

export default connect(null, { signupUser })(Signup);
