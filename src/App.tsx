import { Box, Container } from "@chakra-ui/react";
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
            <Box bg="appBackground" >
              <Container maxW="1800px" p={0}>
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
                      path="/folders/:folderId"
                      element={
                        <AuthProtection href="/signin">
                          <h1>Folders</h1>
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
              </Container>
            </Box>
          </UserDataContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
