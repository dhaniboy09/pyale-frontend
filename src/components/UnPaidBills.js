import React from 'react'
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import PaystackButton from 'react-paystack';
import {generateRandomString} from '../helpers'
import {updateBillPaymentStatus, setTransactionStatus} from "../redux/actions/tenant";

const $ = window.$;
const paystack = require('paystack')(process.env.REACT_APP_PAYSTACK_SECRET_KEY);

class UnPaidBills extends React.Component {
  state = {
    referenceCode: "",
    billID: null,
    unpaidBills: []
  };

  componentWillMount() {
    this.props.getTenantBills().then(() => {
      if (this.props.bills) {
        const unpaidBills = this.props.bills.filter((bill) => {
          return !bill.payment_status
        });
        this.setState({unpaidBills})
      }
    });
  }

  handlePay = (e) => {
    const {param} = e.target.dataset;
    const referenceCode = generateRandomString(8, '#A');
    this.setState({referenceCode, billID: param});
  };

  callBack = () => {
    if (this.state.billID && this.state.referenceCode) {
      const {billID, referenceCode} = this.state;
      paystack.transaction.verify(referenceCode,  (error, body) => {
        if (body.data.status === 'success') {
          this.props.setTransactionStatus('success');
          $('#myModal').hide();
          $('.modal-backdrop').hide();
          this.props.updateBillPaymentStatus(billID, body.data).then(() => {
            if (this.props.billUpdated) {
              this.props.getTenantBills().then(() => {
                if (this.props.bills) {
                  const unpaidBills = this.props.bills.filter((bill) => {
                    return !bill.payment_status
                  });
                  this.setState({unpaidBills})
                }
              });
            }
          });
        } else {
          this.props.setTransactionStatus('failed');
          $('#myModal').hide();
          $('.modal-backdrop').hide();
        }
      });
    }
  };

  render() {
    const {isAuthenticated} = this.props;
    const {unpaidBills} = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/login"/>
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <caption>Unpaid Bills</caption>
          <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Bill</th>
            <th scope="col">Amount</th>
            <th scope="col">Duration</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {
            unpaidBills.length > 0 ?
              unpaidBills.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.amount_currency + item.amount}</td>
                    <td>{item.billing_cycle}</td>
                    <td>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={this.handlePay}
                        data-param={item.id}
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                )
              }) : unpaidBills.length === 0 ? <tr className="text-center">
                <td colSpan="5">No Unpaid Bills</td>
              </tr> : ""
          }
          </tbody>
        </table>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callBack}
                close={this.close}
                disabled={true}
                embed={true}
                reference={this.state.referenceCode}
                email={this.props.user.email}
                amount={10000}
                paystackkey={process.env.REACT_APP_PAYSTACK_PUBLIC_ID}
                tag="button"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    billUpdated: state.tenantReset.billUpdated,
    bills: state.tenant.bills,
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBillPaymentStatus: (id, payload) => dispatch(updateBillPaymentStatus(id, payload)),
    setTransactionStatus: (transactionStatus) => dispatch(setTransactionStatus(transactionStatus))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnPaidBills));