"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ButtonLoader from "../ui-elements/ButtonLoader";

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    console.log("Sign in Result : ", result);
    if (result?.error) {
      return toast.error(result?.error || "Login Error. Please Try Again");
    } else {
      router.replace("/");
      toast.success("User Login Successfully");
    }

    console.log("Here");
  };
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" onSubmit={handleFormSubmit}>
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

          <div className="mb-3">
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
          <ul style={{ listStyle: "none", padding: 0 }}>
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

          <Link href="/forgot-password" className="float-end mt-2">
            Forgot Password?
          </Link>

          <button
            id="login_button"
            type="submit"
            className="btn form-btn w-100 py-2"
            disabled={!allValid || loading}
            style={{ cursor: allValid ? "pointer" : "not-allowed" }}
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>

          <div className="mt-3 mb-4">
            <Link href="/register" className="float-end">
              {" "}
              New User? Register Here{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
