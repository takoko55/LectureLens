import { create } from 'zustand'

const useStore = create((set) => ({
  editedReview: { id: 0, review_content: '', review_star: 0 },
  updateEditedReview: () =>
    set({
      editedReivew: {id: 0, review_content: 'asdf', review_star: 1},
    }),
  resetEditedReview: () => set({ editedReview: { id: 0, review_content: '', review_star: 0 } }),
}))

export default useStore
