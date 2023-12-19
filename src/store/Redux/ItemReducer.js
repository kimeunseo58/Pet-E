import { createSlice, configureStore } from "@reduxjs/toolkit";
// 초기 상태 정의
const initialState = {
  items: [],
  searchKeyword: "", // 검색어 상태 추가
};

// slice 생성
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.searchKeyword = action.payload;
    },
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

// 액션 및 리듀서 추출
const { actions, reducer } = itemSlice;

// 스토어 생성
const store = configureStore({
  reducer: reducer,
});

// 검색어로 아이템 필터링하는 함수
export const filterItemsByKeyword = (keyword, items) => {
  keyword = !keyword ? "" : keyword;
  return items.filter(
    (item) =>
      item.title &&
      typeof item.title === "string" &&
      item.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

// 초기 검색어 설정 및 필터링된 아이템 가져오기
store.dispatch(actions.setKeyword(""));
const currentState = store.getState();
export const filteredItems = filterItemsByKeyword(
  currentState.items.searchKeyword
);

// 액션 및 선택자 내보내기
export const { setItems, setKeyword } = itemSlice.actions;
export const selectItems = (state) => state.items.items; // 아이템 리스트 선택자
export const selectSearchKeyword = (state) => state.items.searchKeyword; // 검색어 선택자

export default itemSlice.reducer;
