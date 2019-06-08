import React from 'react';
import Footer from "./Footer";
import Aux from '../hoc/Aux_'
import Navbar from "./Navbar"
import {connect} from "react-redux";
import {sendEnquiryEmail} from "../redux/actions/email";
import {restStickyNavBar} from "../navHelpers";
import {emailRegex} from "../appConstants";
import {containsEmptyValue, sanitizeUserInput} from "../helpers";


class Contact extends React.Component {
  state = {
    message: "",
    subject: "",
    name: "",
    email: "",
    isLoading: false,
    errors: {
      message: "",
      subject: "",
      name: "",
      email: "",
      emptyFields: ""
    }
  };

  componentDidMount() {
    restStickyNavBar()
  }

  handleChange = (e) => {
    e.preventDefault();
    const {id, value} = e.target;
    let errors = this.state.errors;

    switch (id) {
      case 'name':
        errors.name = value.length < 2 ? 'Your name must be at least 2 characters long' : "";
        break;
      case 'email':
        errors.email = emailRegex.test(value) ? "" : "Please enter a valid email address";
        break;
      default:
        break;
    }
    this.setState({errors, [id]: value})
  };

  hasEmptyFields = (fields) => {
    const {errors} = this.state;
    if (containsEmptyValue(fields)) {
      errors.emptyFields = 'All Fields are required';
      this.setState({errors});
      return true
    }
    return false
  };

  validateForm = () => {
    const {message, subject, name, email, errors} = this.state;
    const formFields = {message, subject, name, email};
    let valid = true;

    // Sanitize form inputs
    sanitizeUserInput(formFields);

    if (!this.hasEmptyFields(formFields)) {
      console.log(formFields);
      Object.values(errors).forEach((val) => {
        val.length > 0 && (valid = false);
      });
      return valid
    } else {
      return false
    }
  };

  handleSendEmail = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({isLoading: true});
      this.props.sendEnquiryEmail(this.state).then(() => {
        if (this.props.enquiryEmailSent) {
          this.setState({
            message: "",
            subject: "",
            name: "",
            email: "",
            isLoading: false
          })
        }
      })
    }
  };

  render() {
    const {enquiryEmailSent} = this.props;
    const {errors} = this.state;
    return (
      <Aux>
        <Navbar/>
        <section className="section section-lg bg-web-desc">
          <div className="bg-overlay"></div>
        </section>
        <section className="section" id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1 className="section-title text-center">Get In Touch</h1>
                <div className="section-title-border margin-t-20"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="mt-4 pt-4">
                  <p className="mt-4"><span className="h5">Phone Number:</span><br/> <span
                    className="text-muted d-block mt-2">+234 818 817 5030</span></p>
                  <p className="mt-4"><span className="h5">Email:</span><br/> <span
                    className="text-muted d-block mt-2">info@pyaleproperties.com</span></p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="custom-form mt-4 pt-4">
                  <div id="message"></div>
                  <form name="contact-form" id="contact-form">
                    { enquiryEmailSent &&
                      <div className="alert alert-success" role="alert">
                        Email Sent Successfully
                      </div>
                    }
                    {errors.emptyFields.length > 0 && <div className="alert alert-danger">{errors.emptyFields}</div>}
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <input
                            name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Name*"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                          {errors.name.length > 0 && <span className="red">{errors.name}</span>}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group mt-2">
                          <input
                            name="email"
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Email*"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                          {errors.email.length > 0 && <span className="red">{errors.email}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject*"
                            value={this.state.subject}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mt-2">
                        <textarea
                          name="message"
                          id="message"
                          rows="4"
                          className="form-control"
                          placeholder="Message*"
                          value={this.state.message}
                          onChange={this.handleChange}
                        >
                        </textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 text-right">
                        <input
                          type="submit"
                          id="submit"
                          name="send"
                          className="submitBnt btn btn-custom"
                          value={this.state.isLoading ? "Sending..." : "Send Message"}
                          onClick={this.handleSendEmail}
                        />
                        <div id="simple-msg"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    enquiryEmailSent: state.email.enquiryEmailSent
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendEnquiryEmail: (payload) => dispatch(sendEnquiryEmail(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);