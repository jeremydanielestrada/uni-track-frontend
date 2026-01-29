/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { formActionDefault } from "../../utils/Helpers";
import type { Governor } from "../../App.types";
import { useNavigate } from "react-router";
import { api } from "../../utils/Axios";
import { Loader } from "lucide-react";
import { useState } from "react";

const formDataDefault = {
  id_num: "",
  password: "",
};

type LoginForm = Pick<Governor, "id_num" | "password">;

function LoginForm() {
  const [formData, setFormData] = useState<LoginForm>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      setFormAction({
        formProcess: false,
        formErrorMessage: "",
        formSuccessMessage: "Registration successful!",
      });
      setFormData(formDataDefault);
      setIsError(false);

      navigate("/dashboard"); // Fixed: Added leading slash
    } catch (err: any) {
      setIsError(true);
      setFormAction({
        formProcess: false,
        formErrorMessage: err.response?.data?.message || "Registration failed",
        formSuccessMessage: "",
      });
    } finally {
      setFormAction((prev) => ({ ...prev, formProcess: false })); // Fixed: Use callback
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p
        className={`text-center mb-3 font-semibold ${isError ? "text-red-500" : "text-green-500"}`}
      >
        {isError ? formAction.formSuccessMessage : formAction.formErrorMessage}
      </p>
      <Input
        label="ID-Num"
        type="text"
        placeholder="e.g., CCIS, CAA, CED"
        name="id_num"
        onChange={handleChange}
        value={formData.id_num}
        required
      />
      <Input
        label="Password"
        type="password"
        onChange={handleChange}
        value={formData.password}
        required
      />

      <Button
        type="submit"
        className={`mt-4 w-full rounded-md ${formAction.formProcess ? "opacity-70 cursor-not-allowed" : ""}`}
        size="sm"
      >
        {formAction.formProcess ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
