import { create } from 'zustand'

const useStore = create((set) => ({
  editedTask: { id: 0, title: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () => set({ editedTask: { id: 0, title: '' } }),
}))

export default useStore
