import axios from "@/axios.js";

var api = {
  SearchHotWords(params) {
    return axios.get("/api/searchHot/info", params);
  },
  getSearchList() {
    return axios.get("/api/interface/search");
  },
  getMenuList(params) {
    return axios.get("/api/interface/nav", params);
  },
  resultsByKeywords(params) {
    return axios.get("api/interface/resultsByKeywords", params);
  },
  getProductsList(params) {
    return axios.get("/api/interface/goodsList", params);
  },
  getClassifyList(params) {
    return axios.get("/api/interface/classify", params);
  },
  getAreaList(params) {
    return axios.get("/api/interface/areaList", params);
  },
  getRecommend(params) {
    return axios.get("/api/interface/recommend", params);
  },
  getHotCity(params) {
    return axios.get("/api/interface/hot", params);
  },
  getRecentCity(params) {
    return axios.get("/api/interface/recents", params);
  },
  getProvince(params) {
    return axios.get("/api/interface/province", params);
  },
  getCurPosition(params) {
    return axios.get("/api/interface/getPosition", params);
  },
  getCityList(params) {
    return axios.get("/api/interface/cityList", params);
  },
  login(params) {
    return axios.get("/api/user/login", params);
  },
  register(params) {
    return axios.post("/api/user/addUser", {
      ...params
    });
  },
  addShopping(params) {
    return axios.post("/api/shop/add", {
      ...params
    });
  },
  showShopping(params) {
    return axios.post("/api/shop/find", {
      ...params
    });
  },
  findShoppingCnt(params) {
    return axios.get("/api/shop/info", params);
  },
  delShopping(params) {
    return axios.post("/api/shop/del", {
      ...params
    });
  },
  pay(params) {
    return axios.post("/api/pay/pay", {
      ...params
    });
  },
  getTicket(params) {
    return axios.get("/api/pay/getTicket?tel=" + params);
  },
  getTicketShopList(params) {
    return axios.get("/api/pay/getTicketShopList?payid=" + params);
  }
};

export default api;
