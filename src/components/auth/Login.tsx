"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonLoader from "../ui-elements/ButtonLoader";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    hasSpecialChar: false,
    hasUppercase: false,
    hasNumber: false,
    hasLowercase: false,
    isSixChars: false,
  });

  const validatePassword = (value: any) => {
    setValidations({
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /\d/.test(value),
      hasLowercase: /[a-z]/.test(value),
      isSixChars: value.length >= 6,
    });
  };

  const allValid = Object.values(validations).every((valid) => valid);

  const handleFormSubmit = async () => {
    // e.preventDefault();
    setLoading(true);

    if (!allValid) {
      setLoading(false);
      return toast.error("Please fill the required Details");
    }

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (result?.error) {
      return toast.success(result?.error || "Login Error. Please Try Again");
    } else {
      router.replace("/");
      toast.success("User Login Successfully");
    }
  };

  const handleGoogleSignIn = async () => {
    return toast.success("Handle Google Sign In");
    // const result = await signIn("google", { callbackUrl: "/", redirect: true });
    // console.log("result : ", result);
  };
  const handleGitHubSignIn = () => {
    return toast.success("Handle Github Sign In");
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <div className="shadow rounded-3 bg-body p-4">
          <h2 className="mb-3">Login</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              placeholder="JohnDoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="password_field">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={password}
              placeholder="John@123"
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
          </div>
          <Link href="/forgot-password" className="float-end">
            Forgot Password?
          </Link>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 15 }}>
            {[
              {
                label: "At least one special character",
                isValid: validations.hasSpecialChar,
              },
              {
                label: "At least one uppercase letter",
                isValid: validations.hasUppercase,
              },
              {
                label: "At least one number",
                isValid: validations.hasNumber,
              },
              {
                label: "At least one lowercase letter",
                isValid: validations.hasLowercase,
              },
              {
                label: "Must be six characters long",
                isValid: validations.isSixChars,
              },
            ].map((rule, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                  color: rule.isValid ? "green" : "black",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                <span
                  style={{
                    color: rule.isValid ? "green" : "red",
                    marginRight: "10px",
                    fontSize: "12px",
                  }}
                >
                  {rule.isValid ? "✅" : "❌"}
                </span>
                {rule.label}
              </li>
            ))}
          </ul>

          <button
            // id="login_button"
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={!allValid || loading}
            style={{ cursor: allValid ? "pointer" : "not-allowed" }}
            onClick={handleFormSubmit}
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>

          <div className="d-flex flex-wrap justify-content-center align-items-between my-4">
            <button
              type="submit"
              className="btn btn-outline-light border border-dark mx-2"
              onClick={handleGoogleSignIn}
            >
              <span className="mx-2 text-black">Sign in with Google</span>
              <Image
                src="/images/google.svg"
                alt="test"
                height={25}
                width={25}
              />
            </button>
            <button
              type="submit"
              className="btn btn-dark border border-dark mx-2"
              onClick={handleGitHubSignIn}
            >
              <span className="mx-2">Sign in with Github</span>
              <Image
                src="/images/github.svg"
                alt="test"
                height={28}
                width={28}
              />
            </button>
          </div>
          <div className="d-flex justify-content-end">
            <Link href="/register" className="">
              {" "}
              Don't have account?{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
