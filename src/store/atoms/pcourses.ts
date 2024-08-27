import { atom } from 'recoil';


interface PCourseState {
  isLoading: boolean;
  pcourse: []; // Assuming it's an array of courses
}

export const pcourseState = atom<PCourseState>({
  key: 'pcourseState',
  default: {
    isLoading: true,
    pcourse: [], // Default to an empty array
  },
});
