/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Loader } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { api } from "../../utils/Axios";
import { formActionDefault } from "../../utils/Helpers";
import type { Governor } from "../../App.types";
import { useNavigate } from "react-router";

const formDataDefault = {
  name: "",
  id_num: "",
  college_dep: "",
  password: "",
};

function RegisterForm() {
  const [formData, setFormData] = useState<Governor>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    try {
      const res = await api.post("/auth/register", formData);

      localStorage.setItem("token", res.data.token);

      setFormAction({
        formProcess: false,
        formErrorMessage: "",
        formSuccessMessage: "Registration successful!",
      });
      setFormData(formDataDefault);
      setIsError(false);

      navigate("/dashboard");
    } catch (err: any) {
      setIsError(true);
      setFormAction({
        formProcess: false,
        formErrorMessage: err.response?.data?.message || "Registration failed",
        formSuccessMessage: "",
      });
    } finally {
      setFormAction((prev) => ({ ...prev, formProcess: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {(formAction.formErrorMessage || formAction.formSuccessMessage) && (
        <p
          className={`text-center mb-3 font-semibold ${isError ? "text-red-500" : "text-green-500"}`}
        >
          {isError
            ? formAction.formErrorMessage
            : formAction.formSuccessMessage}
        </p>
      )}

      <Input
        label="Name"
        type="text"
        placeholder="e.g. Juan Dela Cruz"
        name="name"
        onChange={handleChange}
        value={formData.name}
        required
      />
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
        label="College"
        type="text"
        placeholder="e.g., CCIS, CAA, CED"
        name="college_dep"
        onChange={handleChange}
        value={formData.college_dep}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        name="password"
        onChange={handleChange}
        value={formData.password}
        required
      />

      <Button type="submit" className="mt-4 w-full rounded-md" size="sm">
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

export default RegisterForm;
