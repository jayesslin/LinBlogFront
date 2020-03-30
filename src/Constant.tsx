import axios from "axios";

export const API_PREFIX = "http://localhost/api/v1";
export const RoutePaths = {
  HOME: "/",
  LOGIN_PREFIX: "/login",
  DASHBOARD: "/dashboard",
  STUDENTTABLE: "/studenttable",
  TOOLSDEMO: "/toolsdemo",
  DEMOSUBMITPAGE: "/demosubmitpage",
  Student_Form: "/studentform",

  BLOG: "/blog",
  ADDBLOG: "/add",
  BlogDetail: "/page"
};
export const LocalUrl = "http://localhost:8000";
//export const LocalUrl = "http://localhost:8000";
export const RequestPaths = {
  Get_Blog: "/api/blog/v1/getblog/",
  Add_Blog: "/api/blog/v1/upload/",
  Get_Detail_Blog: "/api/blog/v1/page"
};
export const http = axios.create();
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response && error.response.status === 401) {
      const loginurl = API_PREFIX + RoutePaths.LOGIN_PREFIX;
      console.log("Exception", error);
      //location.pathname = loginurl.toString();
    }
    return Promise.reject(error);
  }
);

export const DEFUALT_BLOG_ID = 0;
