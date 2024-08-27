import { selector } from "recoil";
import { pcourseState } from "../atoms/pcourses";

export const pcLoadingState= selector({
    key:'pcLoadingState',
    get:({get})=>{
        const state= get(pcourseState);
        return state.isLoading;
        
    }
})


export const pcSelector= selector({
    key:'pcSelector',
    get:({get})=>{
        const state= get(pcourseState);
        return state.pcourse;
    }
})
