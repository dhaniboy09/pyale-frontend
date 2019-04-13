import axios from 'axios';
import {setAuthHeader} from '../../actionHelpers'
import moment from 'moment'


export const getTenantDocuments = () => {
  return (dispatch, getState) => {
    const headers = setAuthHeader(getState);
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tenant/documents/`, {headers})
      .then((res) => {
        dispatch({type: 'TENANT_DOCUMENTS_LOAD_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      })
  }
};

export const getTenantBills = () => {
  return (dispatch, getState) => {
    const headers = setAuthHeader(getState);
    const id = getState().auth.user.id;
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tenant/${id}/bills/`, {headers})
      .then((res) => {
        dispatch({type: 'TENANT_BILLS_LOAD_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      })
  }
};

export const getTenantLettings = () => {
  return (dispatch, getState) => {
    const headers = setAuthHeader(getState);
    const id = getState().auth.user.id;
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tenant/${id}/lettings/`, {headers})
      .then((res) => {
        dispatch({type: 'TENANT_LETTINGS_LOAD_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      })
  }
};

export const updateBillPaymentStatus = (id, payload) => {
  return (dispatch, getState) => {
    const headers = setAuthHeader(getState);
    return axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/tenant/${id}/bills/update/`,
      {
        'payment_status': true,
        'transaction_date': moment(payload.transaction_date).format('MMMM Do YYYY, h:mm:ss a'),
        'transaction_reference': payload.reference,
        'is_mobile': payload.log.mobile,
        'bank': payload.authorization.bank,
        'card_type': payload.authorization.card_type,
        'last4': payload.authorization.last4,
        'card_expiry_month': payload.authorization.exp_month,
        'card_expiry_year': payload.authorization.exp_year,
        'card_brand': payload.authorization.brand,
        'transaction_time': payload.log.time_spent,
        'transaction_id': payload.id
      },
      {headers}
    ).then((res) => {
      dispatch({type: 'TENANT_BILLS_UPDATE_SUCCESS'})
    }).catch((error) => {
      console.log(error)
    })
  }
};

export const setTransactionStatus = (transactionStatus) => ({
  type: 'TRANSACTION_STATUS_UPDATE',
  transactionStatus
});



