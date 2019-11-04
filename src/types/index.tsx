
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