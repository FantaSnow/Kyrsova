import BasicRouter from "./routes/BasicRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./api/AuthContext";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <BasicRouter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
