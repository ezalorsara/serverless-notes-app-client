
type ActionState = {
  type: string
}

const billingReducer = (state = false, action: ActionState) => {
  switch (action.type) {
    case 'UPDATING':
      return true;
    case 'SAVE_BILLING_CARD':

      return state;
    default:
      return false;
  }
}

export default billingReducer;
