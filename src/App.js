import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import  Home  from './global/Home';
import LoginForm from './pages/authentication/LoginForm';
import RegisterForm from './pages/authentication/RegisterForm';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import ForgotPassword from './pages/authentication/ForgotPassword';
import termsConditions from './global/terms&conditions';
const router=createBrowserRouter([
  {path:'/',element:<Home/>},
  {path:'/login',element:<LoginForm/>},
  {path:'/register',element:<RegisterForm/>},
  {path:'/reset-password',element:<ForgotPassword/>},
  {path:'/terms-and-conditions',element:<termsConditions/>},
])

function App() {
  const [theme, colorMode] = useMode();

  return (
    
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
           <RouterProvider router={router} />
          </CssBaseline>

        </ThemeProvider>
      </ColorModeContext.Provider>
   
  );
}

export default App;
