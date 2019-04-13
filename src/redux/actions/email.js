import {setAuthHeader} from "../../actionHelpers";
import axios from "axios";

export const sendSupportEmail = (payload) => {
  return (dispatch, getState) => {
    const headers = setAuthHeader(getState);
    return axios.post(`${process.env.REACT_APP_API_URL}/api/v1/tenant/support/`, payload, {headers})
      .then((res) => {
        dispatch({type: 'SUPPORT_EMAIL_SEND_SUCCESS'})
      }).catch((error) => {
        console.log(error)
      })
  }
};

export const sendEnquiryEmail = (payload) => {
  return (dispatch, getState) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/v1/tenant/enquiry/`, payload)
      .then((res) => {
        dispatch({type: 'ENQUIRY_EMAIL_SEND_SUCCESS'})
      }).catch((error) => {
        console.log(error)
      })
  }
};
