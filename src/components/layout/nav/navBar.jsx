import React, { Component } from "react";
import "./user.css";
import "./../../../styles/common.css";
import { LOGOUT } from "../../../events/definitions";
import defaultImages from "../../../imgs/placeholders";
import { Link, Redirect } from "react-router-dom";
import socket from "../../socket";
import GetLayout from "../../modules/getLayout";
import UserProfile from "../userProfile/userProfile";
import queryString from "query-string";
import Welcome from "../../modals/welcome/welcome";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    this.handleQuery();
    socket.on("LOGOUT", this.handleLogoutEvent);
  }

  componentWillUnmount() {
    socket.off("LOGOUT", this.handleLogoutEvent);
  }

  handleLogoutEvent = (user) => {
    console.log("Logout, ", user);
    localStorage.removeItem("token");
    this.setState({ redirect: true });
  };

  handleQuery = () => {
    const { locationSearch } = this.props;
    const values = queryString.parse(locationSearch);
    // console.log(values);
    if (values) {
      try {
        if (values.modal && values.modal === "profile") {
          console.log("Open Profile from Query String");
          this.props.modal(this.handleModal());
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    socket.emit(LOGOUT);
    this.setState({ redirect: true });
  };

  renderLogo = () => {
    return (
      <GetLayout
        renderSize={640}
        renderMobile={this.handleLogoMobile}
        renderDesktop={this.handleLogoDesktop}
      />
    );
  };

  handleLogoDesktop = () => {
    return (
      <div className="logo-container">
        <img className="logo" alt="" src={defaultImages.remoLogo} />
      </div>
    );
  };

  handleLogoMobile = () => {
    return (
      <div className="logo-container-mobile">
        <img className="mobile-logo" alt="" src={defaultImages.appIcon} />
      </div>
    );
  };

  handleModal = () => {
    return [
      {
        body: <UserProfile {...this.props} />,
      },
      { header: "" },
      { footer: "" },
    ];
  };

  renderBurger = () => {
    return <GetLayout renderSize={1280} renderMobile={this.handleBurger} />;
  };

  handleBurger = () => {
    const { mobileState, showMobileNav } = this.props;
    return (
      <div
        className="burger-container"
        onClick={() => mobileState({ showMobileNav: !showMobileNav })}
      >
        <div className="patty" />
        <div className="patty" />
        <div className="patty" />
      </div>
    );
  };

  //Let's break this into it's own component later.
  handleDisplayUser = () => {
    if (!this.props.user) return <React.Fragment />;
    return (
      <div className="user-container">
        <div
          className="user"
          onClick={() => {
            this.props.modal(this.handleModal());
          }}
        >
          {this.props.user.username}{" "}
          <button className="user-logout btn" onClick={this.logout}>
            logout
          </button>
        </div>
      </div>
    );
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <div className="nav-container">
        {this.renderBurger()}
        <Link to="/"> {this.renderLogo()}</Link>
        <Welcome {...this.props} />
        {this.handleDisplayUser()}
      </div>
    );
  }
}
