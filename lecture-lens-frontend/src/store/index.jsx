import { create } from 'zustand'

const useStore = create((set) => ({
  editedReview: { id: 0, title: '' },
  updateEditedReview: (payload) =>
    set({
      editedReivew: payload,
    }),
  resetEditedReview: () => set({ editedReview: { id: 0, title: '' } }),
}))

export default useStore
