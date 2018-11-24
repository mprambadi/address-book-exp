import React, { Component, lazy, Suspense } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import "./App.css";
import api from "./api";
import IconLabelTabs from "./component/Tab";
// import UserLists from "./component/UserLists";
// import UserInput from "./component/UserInput";

import blue from "@material-ui/core/colors/blue";
import { Loader } from "./component/Loader";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  }
});

const UserInput = lazy(()=>import("./component/UserInput"))
const UserLists = lazy(()=>import("./component/UserLists"))

class App extends Component {
  state = {
    loading: false,
    data: [],
    tab: 0,
    loadingMore: false
  };
  componentDidMount() {
    this.fetchData();
    this.detectScroll();
  }

  detectScroll = () => {
    document.onscroll = ev => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchMoreData();
      }
    };
  };
  fetchData = async () => {
    this.setState({ loading: true });
    const { data } = await api.get("/users");

    this.setState({ data, loading: false });
  };

  fetchMoreData = async () => {
    this.setState({ loadingMore: true });
    const { data } = await api.get("/users");

    this.setState(state => ({
      data: [...state.data, ...data],
      loadingMore: false
    }));
  };

  addUser = item => {
    this.setState(state => ({ data: [...state.data, item] }));
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  renderContent = tab => {
    switch (tab) {
      case 1:
        return <UserInput fetchData={this.fetchData} addUser={this.addUser} />;
      case 2:
        return <UserInput />;
      default:
        return (
          <UserLists
            users={this.state.data}
            loading={this.state.loading}
            loadingMore={this.state.loadingMore}
          />
        );
    }
  };
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="container">
            <Loader />
          <IconLabelTabs handleChange={this.handleChange} tab={this.state.tab}>
            <Suspense fallback={<Loader />}>
            {this.renderContent(this.state.tab)}
            </Suspense>
          </IconLabelTabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
