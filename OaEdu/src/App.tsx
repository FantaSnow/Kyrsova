import BasicRouter from "./routes/BasicRouter";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import { ThemeProvider } from "./providers/theme/ThemeProvider";
import MuiThemeProviderWrapper from "./providers/theme/MuiThemeProvider";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MuiThemeProviderWrapper>
          <BrowserRouter>
            <BasicRouter />
          </BrowserRouter>
        </MuiThemeProviderWrapper>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
