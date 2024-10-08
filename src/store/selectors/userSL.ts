import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userLoadingState= selector({
    key:'userLoadingState',
    get:({get})=>{
        const state= get(userState);
        return state.isLoading;
    }
})


export const userSelector= selector({
    key:'userSelector',
    get:({get})=>{
        const state= get(userState);
        return state.username;
    }
})
