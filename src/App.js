import logo from './logo.svg';
import './App.css';
import {DashBoard} from "./src/module";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
   <DashBoard/>
   </ThemeProvider>
  );
}

export default App;
