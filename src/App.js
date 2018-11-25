import React from "react";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const Dashboard = React.lazy(() => import("./view/dashboard"));
const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Suspense
        fallback={
          <div style={{ display: "flex", justifyContent: "center" }}>
            Loading......
          </div>
        }
      >
        <div className="container">
          <Dashboard />
        </div>
      </React.Suspense>
    </MuiThemeProvider>
  );
};

export default App;
