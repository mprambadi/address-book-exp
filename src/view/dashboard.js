import React, { Component, lazy, Suspense } from "react";
import "../App.css";
import api from "../api";
import IconLabelTabs from "../component/Tab";
import { Loader } from "../component/Loader";

// import UserLists from "./component/UserLists";
// import UserInput from "./component/UserInput";



const UserInput = lazy(()=>import("../component/UserInput"))
const UserLists = lazy(()=>import("../component/UserLists"))

class Dashboard extends Component {
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
 
          <IconLabelTabs handleChange={this.handleChange} tab={this.state.tab}>
            <Suspense fallback={<div>Loading....</div>}>
            {this.renderContent(this.state.tab)}
            </Suspense>
          </IconLabelTabs>

    );
  }
}

export default Dashboard;
