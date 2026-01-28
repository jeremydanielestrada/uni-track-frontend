import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

function RegisterForm() {
  return (
    <form>
      <Input label="Name" type="text" />
      <Input label="ID-Num" type="text" />
      <Input label="College" type="text" />
      <Input label="Password" type="password" />

      <Button type="submit" className="mt-4 w-full rounded-md" size="sm">
        Submit
      </Button>
    </form>
  );
}

export default RegisterForm;
