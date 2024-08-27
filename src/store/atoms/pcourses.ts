import { atom } from 'recoil';


export interface PCState {
  isLoading: boolean;
  pcourse: string[]; // Assuming it's an array of courses
}

export const pcourseState = atom<PCState>({
  key: 'pcourseState',
  default: {
    isLoading: true,
    pcourse: [], // Default to an empty array
  },
});
