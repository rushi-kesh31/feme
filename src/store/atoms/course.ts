// src/store/atoms/course.ts

import { atom } from 'recoil';

interface Course {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
  _id: string;
  productd: string;
  rating: number;
}

interface CourseState {
  isLoading: boolean;
  course: Course | null; // Course can be null initially
}

export const courseState = atom<CourseState>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null,
  },
});
