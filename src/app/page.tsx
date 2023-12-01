"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import ErrorText from "@/component/ErrorText";
import InputText from "@/component/InputText";

function Login() {
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState({
    password: "admin",
    username: "admin",
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.username.trim() === "" || loginObj.password.trim() === "") {
      return setErrorMessage('Username is required! (use "admin")');
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(loginObj),
        });
        const responseParsed = await response.json();

        if (responseParsed.message === "Authorized") {
          return push("/dashboard");
        }

        throw new Error(responseParsed);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        setErrorMessage('Invalid user, use "admin" in both fields');
      }
      setLoading(false);
    }
  };

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="hero min-h-full rounded-l-xl bg-base-200 relative overflow-hidden ">
            <div className="hero-content">
              <div className="max-w-md text-neutral-content bg-neutral/80 rounded-xl py-2 px-10">
                <h1 className="text-3xl text-center font-bold ">
                  Technical Challenge
                </h1>
                <h1 className="text-3xl text-center font-bold ">
                  Financial dashboard
                </h1>
                <div className="blur-sm saturate-200 absolute top-0 left-0 w-full z-[-1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className=""
                    src="https://source.unsplash.com/random/512x592"
                    width={512}
                    height={592}
                    alt="Random background image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  value={loginObj.username}
                  type="username"
                  containerStyle="mt-4"
                  labelTitle="Username"
                  onChange={(e) => updateFormValue("username", e.target.value)}
                />

                <InputText
                  value={loginObj.password}
                  type="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  onChange={(e) => updateFormValue("password", e.target.value)}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
