import React, { Component } from "react";
import Toggle from "../../common/toggle";
import InlineResponse from "../../common/inlineResponse";
import InlineItem from "../../presentation/inlineProfileItem";
import axios from "axios";
import { updateUserSettings } from "../../../config";

export default class UserNotificationSettings extends Component {
  state = {
    status: "",
    error: "",
    settings: {
      enable_email_notifications: null,
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.settings.enable_email_notifications !== null &&
      prevState.settings.enable_email_notifications !==
        this.state.settings.enable_email_notifications
    )
      this.handleUpdateServer();
  }

  componentDidMount() {
    let { settings } = this.props;
    if (!settings.hasOwnProperty("enable_email_notifications"))
      settings.enable_email_notifications = true;
    this.setState({ settings: settings });
  }

  handleToggle = () => {
    const { status } = this.state;
    if (status === "") {
      this.setState((state) => {
        return {
          status: "...sending request",
          settings: {
            ...state.settings,
            enable_email_notifications: !state.settings
              .enable_email_notifications,
          },
        };
      });
    }
  };

  handleUpdateServer = async () => {
    const token = localStorage.getItem("token");
    await axios
      .post(
        updateUserSettings,
        {
          settings: this.state.settings,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.error) {
          this.setState({
            error: res.data.error,
          });
          return;
        } else {
          this.setState({ status: "Request updated successfully!" });
          return;
        }
      })
      .catch((err) => {
        console.log("Add Server Error: ", err);
      });
  };

  handleCloseResponse = () => {
    this.setState({ status: "", error: "" });
  };

  handleSubmitResponse = () => {
    const { error, status } = this.state;
    if (error !== "")
      return (
        <InlineResponse message={error} onClose={this.handleCloseResponse} />
      );
    if (status !== "")
      return (
        <InlineResponse
          message={status}
          type="success"
          onClose={
            status === "...sending request" ? null : this.handleCloseResponse
          }
        />
      );

    return null;
  };

  handleContent = () => {
    const { email_verified } = this.props.status;

    if (!email_verified) return "verified email required.";
    return (
      <Toggle
        toggle={this.state.settings.enable_email_notifications}
        label=""
        onClick={this.handleToggle}
        critical={false}
        inline
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <InlineItem
          label="enable email notifications:"
          item={this.handleContent()}
        />
        {this.handleSubmitResponse()}
      </React.Fragment>
    );
  }
}
