
type ActionState = {
  type: string
}

const notesReducer = (state = false, action: ActionState) => {
  switch (action.type) {
    case 'UPDATING':
      return true;
    default:
      return false;
  }
}

export default notesReducer;
