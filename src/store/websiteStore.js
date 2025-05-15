import create from 'zustand';

export const useWebsiteStore = create((set) => ({
  // Website state
  featuredQuizzes: [],
  testimonials: [],

  // Actions
  setFeaturedQuizzes: (quizzes) => set({ featuredQuizzes: quizzes }),
  setTestimonials: (testimonials) => set({ testimonials }),

  // Other website-related state and actions
  contactFormData: {},
  setContactFormData: (formData) => set({ contactFormData: formData }),
  clearContactFormData: () => set({ contactFormData: {} }),
}));