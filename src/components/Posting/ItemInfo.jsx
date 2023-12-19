import React, { useEffect, useState } from "react";
import "assets/CSS/Upload/ItemInfo.css";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import axios from "axios";
const filterItemsByKeyword = (keyword, itemList) => {
  keyword = !keyword ? "" : keyword;
  let itemFilter = itemList.filter(
    (item) =>
      typeof item.product_name === "string" &&
      item.product_name.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log(itemFilter);
  return itemFilter;
};
const ItemInfo = ({ onCheck }) => {
  const [keyword, setkey] = useState("");
  const [itemList, setItemList] = useState([]);
  const [filteredItems, setFilteredItems] = useState(itemList); // 검색어에 따라 필터링된 아이템
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(`/api/bestReviewsProductList/`);
        if (res.status === 200) setItemList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();

    setFilteredItems(filterItemsByKeyword(keyword, itemList));
  }, [keyword]);

  const [isDivVisible, setIsDivVisible] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const handleSearchItem = (e) => {
    setkey(e.target.value);
    if (e.target.value.length > 0) setIsEntered(true);
    if (e.target.value === "") {
      setIsEntered(false);
    }
  };

  const handleOptionChange = (prod) => {
    console.log(prod);
    if (prod === "etc") {
      onCheck({
        product_id: "etc",
      });
      setSelectedItem({
        product_id: "etc",
        product_name: "기타 제품",
      });
    } else {
      setSelectedItem(prod);
      onCheck(prod.product_id);
    }
    setIsDivVisible(false);
  };
  const selectedItemAgain = () => {
    setkey("");
    setSelectedItem({});
    setIsDivVisible(true);
  };

  return (
    <div id="ItemInfo">
      {selectedItem.title === undefined && (
        <label id="handleSearchItem">
          <input
            type="text"
            placeholder="상품명 검색"
            onChange={handleSearchItem}
          />
        </label>
      )}
      {selectedItem.product_id !== undefined && (
        <div id="selectedItem">
          {selectedItem.product_id === "etc" && (
            <BsFillQuestionSquareFill id="checkedETC" />
          )}
          {selectedItem.product_id !== "etc" && (
            <img src={selectedItem.img} alt="" />
          )}
          <p>{selectedItem.product_name}</p>
          <button onClick={selectedItemAgain}>
            <MdCancel />
          </button>
        </div>
      )}

      <div id="buttonsInput">
        {/* {isDivVisible && keyword !== "" && filteredItems.length === 0 && (
          <button
            value="기타"
            onClick={() => handleOptionChange("etc")}
            id="ShowItemsETC"
          >
            <BsFillQuestionSquareFill id="etcICON" />
            <p>기타 제품</p>
          </button>
        )} */}
        {isDivVisible && keyword !== "" && (
          <div
            id={isEntered ? "ShowItems" : "HideItems"}
            style={{ height: `${filteredItems.length * 3.2}rem` }}
          >
            {filteredItems.map((prod) => (
              <div key={prod.product_id}>
                <button value={prod} onClick={() => handleOptionChange(prod)}>
                  <img src={prod.img} alt="" />
                  <p>{prod.product_name}</p>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ItemInfo;
