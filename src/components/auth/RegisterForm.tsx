import { Input } from "../ui/Input";

function RegisterForm() {
  return (
    <div className="p-8 border border-secondary shadow-lg">
      <form>
        <Input label="Name" type="text" />
        <Input label="ID-Num" type="text" />
        <Input label="College" type="text" />
        <Input label="Password" type="password" />
      </form>
    </div>
  );
}

export default RegisterForm;
