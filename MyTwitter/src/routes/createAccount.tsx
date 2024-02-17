import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import createForm from "../interface/createAccount";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function createAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {
  //     target: { name, value },
  //   } = e;
  //   if (name === "name") {
  //     setName(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };
  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     // create an account
  //     // set the name of the user.
  //     // redirect to the home page
  //   } catch (e) {
  //     // setError
  //   } finally {
  //     values.isLoading = false;
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createForm>();

  // handleSubmit이 유효한 경우 실행
  const onSubmit = async (data: createForm) => {
    if (
      isLoading ||
      data.name === "" ||
      data.email === "" ||
      data.password === ""
    )
      return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials);
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
      navigate("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          // onChange={onChange}
          // name="name"
          // value={values.name}
          {...register("name")}
          placeholder="Name"
          type="text"
          required
        />
        <span>{errors?.name?.message}</span>
        <Input
          // onChange={onChange}
          // name="email"
          // value={values.email}
          {...register("email")}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          // onChange={onChange}
          // value={values.password}
          // name="password"
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          // value={value.isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {/* {values.error !== "" ? <Error>{values.error}</Error> : null} */}
    </Wrapper>
  );
}
