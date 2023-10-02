import tw from "twin.macro";
import { hCenter } from "./base";

export const detailFlex = tw`flex gap-[5px] mt-6 lg:(block)`;
export const detailAnchor = tw`flex gap-3.5 mb-6 flex-wrap lg:(flex-col )`;
export const detailTab = [hCenter, tw`gap-[5px] mb-6 flex-wrap`];
export const detailTabBtn = tw`block text-blue-button font-bold px-3 py-[7px] border border-blue-button rounded-[3px]`;
export const detailRoundTabBtn = tw`block text-blue-button font-bold px-[18px] py-[7px] border border-blue-button rounded-[3px]`;
export const detailTabBtnSelected = tw`text-white  bg-blue-button`;
export const detailBody = tw`flex flex-col gap-8`;
export const detailCategoryName = tw`text-2xl font-bold mb-6`;
