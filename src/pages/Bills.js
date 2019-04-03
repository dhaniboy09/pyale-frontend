import React from 'react'
import Aux from '../hoc/Aux_';
import Navbar from "../components/Navbar";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Footer from "../components/Footer";
import SocialMedia from "../components/SocialMedia";
import FooterLinks from "../components/FooterLinks";
import {getTenantBills} from "../redux/actions/tenant";
import PaidBills from "../components/PaidBills";
import UnPaidBills from "../components/UnPaidBills";
import {restStickyNavBar} from "../navHelpers";


class Bills extends React.Component {
  state = {
    bills: [],
  };

  componentDidMount() {
    restStickyNavBar()
  }

  render() {
    const {isAuthenticated, billUpdated, transactionStatus} = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login"/>
    }

    return (
      <Aux>
        <Navbar/>
        <section className="section section-lg bg-web-desc">
          <div className="bg-overlay"></div>
        </section>
        <section className="section pt-5" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1 className="section-title text-center">
                  Bills
                </h1>
                <div className="section-title-border margin-t-20"></div>
                <p className="section-subtitle text-muted text-center padding-t-30 font-secondary">
                  Manage all bills
                </p>
                {
                  transactionStatus === 'success' &&
                      <div className="alert alert-success" role="alert">
                        Transaction Successful.
                      </div>
                }
                {
                  transactionStatus === 'failure' &&
                    (
                      <div className="alert alert-success" role="alert">
                        Transaction Failed. Please Try Again
                      </div>

                    )
                }
              </div>
              <UnPaidBills getTenantBills={this.props.getTenantBills}/>
              <PaidBills getTenantBills={this.props.getTenantBills}/>
            </div>
          </div>
        </section>
        <SocialMedia/>
        <Footer/>
        <FooterLinks/>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.tenant.bills,
    billUpdated: state.tenantReset.billUpdated,
    isAuthenticated: state.auth.isAuthenticated,
    transactionStatus: state.tenantReset.transactionStatus

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTenantBills: () => dispatch(getTenantBills())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bills));