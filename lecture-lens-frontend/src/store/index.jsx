import { create } from 'zustand'

const useStore = create((set) => ({
  editedReview: { id: 0, review_content: '', review_star: 0 },
  updateEditedReview: (payload) =>
    set({
      editedReview: payload,
    }),
  resetEditedReview: () => set({ editedReview: { id: 0, review_content: '', review_star: 0 } }),
}))

export default useStore
