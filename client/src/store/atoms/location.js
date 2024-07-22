import { atom } from "recoil";
export const currentLocation= atom({
    key:"currentLocation", 
    default:{
        lat:"", 
        long:""
    }
})