import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen  bg-background">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
