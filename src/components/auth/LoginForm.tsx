/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { formActionDefault } from "../../utils/Helpers";
import type { Governor } from "../../App.types";
import { useNavigate } from "react-router";
import { api } from "../../utils/Axios";
import { Loader } from "lucide-react";
import { AuthContext } from "../hooks/AuthContext";
import { useState, useContext } from "react";

const formDataDefault = {
  id_num: "",
  password: "",
};

type LoginForm = Pick<Governor, "id_num" | "password">;

function LoginForm() {
  const [formData, setFormData] = useState<LoginForm>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      authContext?.setGovernor(res.data.user);

      setFormAction({
        formProcess: false,
        formErrorMessage: "",
        formSuccessMessage: "Login successful!",
      });
      setFormData(formDataDefault);

      navigate("/dashboard");
    } catch (err: any) {
      setFormAction({
        formProcess: false,
        formErrorMessage: err.response?.data?.message || "Login failed",
        formSuccessMessage: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formAction.formErrorMessage && (
        <p className="text-center mb-3 font-semibold text-red-500">
          {formAction.formErrorMessage}
        </p>
      )}
      {formAction.formSuccessMessage && (
        <p className="text-center mb-3 font-semibold text-green-500">
          {formAction.formSuccessMessage}
        </p>
      )}

      <Input
        label="ID-Num"
        type="text"
        placeholder="e.g. 221-00000"
        name="id_num"
        onChange={handleChange}
        value={formData.id_num}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        required
      />

      <Button
        type="submit"
        className={`mt-4 w-full rounded-md ${formAction.formProcess ? "opacity-70 cursor-not-allowed" : ""}`}
        size="sm"
        disabled={formAction.formProcess}
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
