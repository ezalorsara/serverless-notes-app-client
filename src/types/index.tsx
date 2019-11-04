
export type isAuthenticatedType = {
  loggedin_state: boolean
}

export type TNote = {
  attachment: '' | null,
  content: string,
  createdAt: number,
  noteId: string,
  userId: string,
  attachmentURL: string
}

export type Billing = {
  storage: number,
  name: string,
}

export type TCREDITCARDINFO = {
  brand: string,
  cardHoldersName: string
}

export type TOKEN_TYPE = {
  id:string
}

export type STRIPE_TYPE = { createToken: (arg0: { name: any; }) => PromiseLike<{ token: any; error: any; }> | { token: any; error: any; }; }; 