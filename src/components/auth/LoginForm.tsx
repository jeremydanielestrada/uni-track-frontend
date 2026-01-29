import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

function LoginForm() {
  return (
    <form>
      <Input label="ID-Num" type="text" placeholder="e.g., CCIS, CAA, CED" />
      <Input label="Password" type="password" />
      <Button type="submit" className="mt-4 w-full rounded-md" size="sm">
        Submit
      </Button>
    </form>
  );
}

export default LoginForm;
