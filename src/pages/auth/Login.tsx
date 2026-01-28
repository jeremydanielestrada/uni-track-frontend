import { Link } from "react-router";

import LoginForm from "../../components/auth/LoginForm";
import Card from "../../components/ui/Card";

function Login() {
  return (
    <div className="w-full py-10">
      <div className="mb-8 text-center">
        <div className="w-14 h-14 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">📍</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">UniTrack</h1>
        <p className="text-muted-foreground text-base">
          College Governor Dashboard
        </p>
      </div>
      <Card classname="w-150 mx-auto">
        <LoginForm />
        <div className="pt-3 w-full">
          <span className="float-right text-sm text-gray-600">
            Don't have an account?
            <Link
              to="register"
              className="text-primary ml-1 font-medium hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Login;
