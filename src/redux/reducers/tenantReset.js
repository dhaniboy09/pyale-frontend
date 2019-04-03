const initState = {
  billUpdated: false,
  transactionStatus: ''
};

const tenantReset = (state = initState, action) => {
  switch (action.type) {
    case 'TENANT_BILLS_UPDATE_SUCCESS':
      return {
        ...state,
        billUpdated: true
      };
    case 'TRANSACTION_STATUS_UPDATE':
      return {
        ...state,
        TRANSACTION_SUCCESSFUL: action.transactionStatus
      };
    default:
      return state
  }
};

export default tenantReset;
