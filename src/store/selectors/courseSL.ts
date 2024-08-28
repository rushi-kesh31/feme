import { selector } from "recoil";
import { courseState } from "../atoms/course.ts";

export const courseLoading = selector({
  key: 'courseLoadingState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.isLoading;
  },
});

export const courseDetails = selector({
  key: 'courseDetailsState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course || null; // Return null if course doesn't exist
  },
});

export const courseTitle = selector({
  key: 'courseTitleState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.title : ""; // Handle null case
  },
});

export const courseDes = selector({
  key: 'courseDesState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.description : "";
  },
});

export const coursePrice = selector({
  key: 'coursePriceState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.price : "";
  },
});

export const courseImage = selector({
  key: 'courseImageState',
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course && state.course.imgageLink) {
      
      return Array.isArray(state.course.imgageLink) 
        ? state.course.imgageLink 
        : [state.course.imgageLink];
    }
    return []; 
  },
});

export const coursePub = selector({
  key: 'coursePubState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.published : "";
  },
});

export const courseID = selector({
  key: 'courseIDState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course._id : "";
  },
});

export const productd = selector({
  key: 'productdState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.productd : "";
  },
});

export const rating = selector({
  key: 'ratingState',
  get: ({ get }) => {
    const state = get(courseState);
    return state.course ? state.course.rating : 0;
  },
});
