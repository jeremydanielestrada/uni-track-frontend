import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./components/hooks/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen  bg-background">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
