import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProtection from "./components/auth/AuthProtection";
import UnAuthProtection from "./components/auth/UnAuthProtection";
import AuthContextProvider from "./context/AuthContext";
import UserDataContextProvider from "./context/UserDataContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <UserDataContextProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthProtection href="/">
                      <Dashboard />
                    </AuthProtection>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <UnAuthProtection>
                      <SignIn />
                    </UnAuthProtection>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <UnAuthProtection>
                      <SignUp />
                    </UnAuthProtection>
                  }
                />
              </Routes>
            </BrowserRouter>
          </UserDataContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
