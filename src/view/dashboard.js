import React, { Component, lazy, Suspense } from "react";
import "../App.css";
import api from "../api";
import IconLabelTabs from "../component/Tab";
import Favorite from "../component/Favorite";
import UserDetail from "../component/UserDetail";

const UserInput = lazy(() => import("../component/UserInput"));
const UserLists = lazy(() => import("../component/UserLists"));

class Dashboard extends Component {
  state = {
    loading: false,
    data: [],
    favorite: [],
    tab: 0,
    loadingMore: false,
    page: 1,
    morePage: false,
    detail: {
      status: false,
      user: {},
      edit: false
    }
  };
  componentDidMount() {
    this.fetchFavorite();
    this.fetchData();

    this.detectScroll();
  }

  detectScroll = () => {
    document.onscroll = ev => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.setState(state => {
          return {
            page: state.page + 1
          };
        });
        this.fetchMoreData();
      }
    };
  };
  fetchData = async () => {
    this.setState({ loading: true });
    const { data } = await api.get(`/users/1`);

    this.setState({ data, loading: false, page: 1 });
  };

  fetchFavorite = async () => {
    const { data } = await api.get("/users");
    this.setState({ favorite: data });
  };

  fetchMoreData = async () => {
    this.setState({ loadingMore: true });
    const { data } = await api.get(`/users/${this.state.page}`);

    console.log(data);
    if (data.count !== this.state.data.data.length) {
      this.setState(state => {
        return {
          data: { ...state.data, data: [...state.data.data, ...data.data] },
          page: state.data.data.length % 6 === 0 ? state.page : data.pages,
          loadingMore: false
        };
      });
      return;
    }

    this.setState(state => {
      return {
        loadingMore: false,
        page: data.pages - 1,
        morePage: !state.morePage
      };
    });
  };

  addUser = item => {
    this.setState(state => ({
      data: { ...state.data, data: [...state.data.data, item] }
    }));
  };

  handleChange = (event, value) => {
    this.setState({ tab: value });
  };

  handleDetail = user => {
    this.setState(state => {
      return { detail: { ...state.detail, ...user } };
    });
  };

  handleUpdateUser = async () => {
    const {
      detail: {
        user: { id, name, address, phone }
      }
    } = this.state;
    await api.patch(`/users/${id}`, {
      address,
      name,
      phone
    });

    this.fetchFavorite()
    this.fetchData();
  };

  addStar = async user => {
    await api.patch(`/users/${user.id}`, user);
    this.fetchFavorite()
    this.fetchData();
  };

  deleteUser = async (id) => {
  const {data} =   await api.delete(`/users/${id}`)
    
  console.log(data)
  this.fetchFavorite();
    this.fetchData();
  }

  renderContent = tab => {
    switch (tab) {
      case 1:
        return (
          <Favorite
            users={this.state.favorite}
            loading={this.state.loading}
            loadingMore={this.state.loadingMore}
            addStar={this.addStar}
          />
        );
      case 2:
        return <UserInput fetchData={this.fetchData} addUser={this.addUser} />;
      default: {
        return this.state.detail.status ? (
          <UserDetail
            handleDetail={this.handleDetail}
            detail={this.state.detail}
            handleUpdateUser={this.handleUpdateUser}
          />
        ) : (
          <UserLists
            users={this.state.data}
            loading={this.state.loading}
            loadingMore={this.state.loadingMore}
            addStar={this.addStar}
            handleDetail={this.handleDetail}
            detail={this.state.detail}
            handleDelete={this.deleteUser}
          />
        );
      }
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
