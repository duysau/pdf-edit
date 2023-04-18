import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FORBIDENT_ROUTE, LOGIN_ROUTE } from "core/config/consts";
import * as Cookie from "js-cookie";
import moment from "moment";
import { Repository } from "react3l-common";
import appMessageService, {
  messageType,
} from "core/services/common-services/app-message-service";
import { createBrowserHistory } from "history";

export const httpConfig: AxiosRequestConfig = {
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "X-TimeZone": moment().utcOffset() / 60,
  },
};

class HttpInterceptor {
  static history = createBrowserHistory();

  public async initialize(
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse,
    errorInterceptor?: (error: AxiosError) => void | Promise<void>
  ): Promise<void> {
    Repository.requestInterceptor =
      requestInterceptor ??
      function (config: AxiosRequestConfig): AxiosRequestConfig {
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
        return config;
      };

    Repository.responseInterceptor =
      responseInterceptor ??
      function (response: AxiosResponse): AxiosResponse {
        return response;
      };

    Repository.errorInterceptor =
      errorInterceptor ??
      function (error: AxiosError): void | Promise<void> {
        if (error?.response?.status) {
          switch (error.response.status) {
            case 400:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Bạn cần kiểm tra lại các trường dữ liệu",
                description: error.response.statusText,
              });
              break;
            case 401:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Bạn chưa đăng nhập để thực hiện thao tác",
                description: error.response.statusText,
              });
              localStorage.removeItem("currentUserInfo");
              Cookie.remove("Token");
              window.location.href = LOGIN_ROUTE;
              break;
            case 403:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Bạn không có quyền thực hiện thao tác",
                description: error.response.statusText,
              });
              HttpInterceptor.history.push(FORBIDENT_ROUTE);
              break;
            case 420:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "lỗi BE",
                description: error.response.statusText,
              });
              break;
            case 500:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Lỗi hệ thống",
                description: error.response.statusText,
              });
              break;
            case 502:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Server BE không hoạt động",
                description: error.response.statusText,
              });
              break;
            case 504:
              appMessageService.messageFactory({
                type: messageType.ERROR,
                title: "Phản hồi quá chậm",
                description: error.response.statusText,
              });
              break;
            default:
              break;
          }
        }
        throw error;
      };
  }
}

export const httpInterceptor = new HttpInterceptor();
