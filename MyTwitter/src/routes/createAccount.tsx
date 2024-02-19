import { useState } from "react";
import { useForm } from "react-hook-form";
import createForm from "../interface/createAccount";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import { FirebaseError } from "firebase/app";

export default function createAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createForm>();

  // handleSubmit이 유효한 경우 실행
  const onSubmit = async (data: createForm) => {
    setError("");
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
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="Name" type="text" required />
        <span>{errors?.name?.message}</span>
        <Input
          {...register("email")}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정을 생성했나요? <Link to={"/login"}>로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
