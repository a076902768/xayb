import qs from 'qs';
import Api from '@/assets/js/api/api.js';

class FrontendApi extends Api {
  /**
   * 登入
   */
  static async login({
    userId, userPwd,
  }) {
    const data = qs.stringify({
      userId, userPwd,
    });
    // const formdata = new FormData();

    // formdata.set('userId', userId);
    // formdata.set('userPwd', userPwd);

    const res = await this.callAxios('POST', '/main/login', data, undefined, false);
    return res;
  }

  /**
   * 登出
   */
  static async logout() {
    const formdata = new FormData();

    const res = await this.callAxios('GET', '/main/logout', formdata, undefined, true);
    return res;
  }

  /**
   * 取得問卷調查
   */
  static async getSurvey() {
    const res = await this.callAxios('GET', '/main/survey', undefined, undefined, true);
    return res;
  }

  /**
   * 填寫問卷調查
   */
  static async setSurvey(answer) {
    const data = qs.stringify({
      answer: JSON.stringify(answer),
    });
    const res = await this.callAxios('POST', '/main/survey', data, undefined, true);
    return res;
  }

  /**
   * 忘記密碼 - 發送要求
   */
  static async passwordForget(userId) {
    const data = qs.stringify({
      userId,
    });
    const res = await this.callAxios('POST', '/main/password-forget', data, undefined, false);
    return res;
  }

  /**
   * 報修故障
   */
  static async setMaintenance({
    userName, userPhone, userMail, contactTime, questionType,
  }) {
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('userPhone', userPhone);
    formData.append('userMail', userMail);
    formData.append('contactTime', contactTime);
    formData.append('questionType', questionType);
    const res = await this.callAxios('POST', '/main/customer-service', formData, undefined, true);
    return res;
  }

  /**
   * 客戶服務 修改密碼
   */
  static async passwordReset({
    oriPassword, newPassword, reNewPassword,
  }) {
    const data = qs.stringify({
      oriPassword, newPassword, reNewPassword,
    });

    const res = await this.callAxios('PATCH', '/main/password-reset', data, undefined, true);
    return res;
  }

  /**
   * 客戶服務 用戶設定
   */
  static async userSetting({
    nickName, allowedPhones,
  }) {
    const obj = {};
    if (nickName) {
      obj.nickName = nickName;
    }
    if (allowedPhones) {
      obj.allowedPhones = allowedPhones;
    }
    const data = qs.stringify(obj);

    const res = await this.callAxios('PATCH', '/main/user-setting', data, undefined, true);
    return res;
  }

  /*
   * 取得昨日用電量
   */
  static async getYesterday() {
    const formdata = new FormData();
    // formdata.set('Token', Token);
    const res = await this.callAxios('GET', '/main/trace/yesterday', formdata, undefined, true);
    return res;
  }

  /**
   * 取得ORcode內容
   */
  static async getQRCode() {
    const res = await this.callAxios('GET', '/main/user-setting', undefined, undefined, true);
    return res;
  }

  /*
   * 取得本月 (用電目標 & 預測 & 累積)
   */
  static async getCurrentMon() {
    const formdata = new FormData();
    // formdata.set('Token', Token);
    const res = await this.callAxios('GET', '/main/trace/current-mon', formdata, undefined, true);
    return res;
  }

  /**
   * 行動電話登入QRCode驗證
   */
  static async qrCodeVertify(uid) {
    const res = await this.callAxios('GET', `/main/mobile/${uid}`, undefined, undefined, false);
    return res;
  }

  /*
   * 用電流向
   */
  static async getAppliance() {
    const formdata = new FormData();
    // formdata.set('Token', Token);
    const res = await this.callAxios('GET', '/main/trace/appliance', formdata, undefined, true);

    return res;
  }

  /**
   * 手機登入
   */
  static async mobileLogin({
    qrCode, phoneNumber,
  }) {
    const data = qs.stringify({
      qrCode, phoneNumber,
    });

    const res = await this.callAxios('POST', '/main/mobile/login', data, undefined, false);
    return res;
  }

  /**
   * BEE快速登入
   */
  static async autoLogin() {
    const res = await this.callAxios('POST', '/main/auto-login/', null, undefined, true);
    return res;
  }


  /*
   * 忘記密碼 - 修改密碼
   */
  static async restPassword({
    userId, apSystem, code, newPassword, reNewPassword,
  }) {
    const formdata = new FormData();
    formdata.set('userId', userId);
    formdata.set('apSystem', apSystem);
    formdata.set('code', code);
    formdata.set('newPassword', newPassword);
    formdata.set('reNewPassword', reNewPassword);


    const res = await this.callAxios('PATCH', '/main/password-forget-reset', formdata, undefined, false);
    return res;
  }

  /**
   * 取得所有熱門節電話題
   */
  static async getHotTopics({ page, size }) {
    const res = await this.callAxios('GET', `/main/topics?page=${page}&size=${size}`, undefined, undefined, true);
    return res;
  }

  /**
   * 取得許願池最近10則留言
   */
  static async getWishingPond() {
    const res = await this.callAxios('GET', '/main/wishing-pond', undefined, undefined, true);
    return res;
  }

  /*
   * 用電目標額度設定
   */
  static async setGoal({
    target,
  }) {
    const formdata = new FormData();
    if (target) {
      formdata.set('target', target);
    }

    // formdata.set('userPwd', userPwd);

    const res = await this.callAxios('PATCH', '/main/trace/target', formdata, undefined, true);
    return res;
  }


  /**
   * 許願池留言
   */
  static async setWishingPond({
    message,
  }) {
    const formdata = new FormData();
    formdata.set('message', message);


    const res = await this.callAxios('POST', '/main/wishing-pond', formdata, undefined, true);
    return res;
  }

  /**
   * 取得所有過往節電話題
   */
  static async getOldTopics({ page, size }) {
    const res = await this.callAxios('GET', `/main/topics/history?page=${page}&size=${size}`, undefined, undefined, true);
    return res;
  }

  /**
   * 取得雲端遙控主頁
   */
  static async getCloudRemoteList() {
    const res = await this.callAxios('GET', '/main/cloud-remote', undefined, undefined, true);
    return res;
  }

  /**
   * 更新裝置開關狀態
   */
  static async updateDeviceOnOffStatus({ devId, powerStatus }) {
    const params = new URLSearchParams();
    params.append('deviceId', devId);
    params.append('onOff', powerStatus);

    const res = await this.callAxios('POST', '/main/cloud-remote/on-off', params, 'application/x-www-form-urlencoded;charset=UTF-8', true);
    return res;
  }

  /**
   * 取得設備的排程列表
   */
  static async getScheduleList({ deviceId }) {
    const res = await this.callAxios('GET', `/main/cloud-remote/schedule?deviceId=${deviceId}`, undefined, undefined, true);

    if (res.data && !res.data.schedules) {
      res.data.schedules = [];
    }

    return res;
  }

  /**
   * 新增排程
   */
  static async addSchedule({
    deviceId, action, schedFreq, schedDate, schedWeek, schedTime,
  }) {
    const formData = new FormData();
    formData.set('deviceId', deviceId);
    formData.set('action', action);
    formData.set('schedFreq', schedFreq);
    formData.set('schedTime', schedTime);

    if (schedDate) {
      formData.set('schedDate', schedDate);
    }

    if (schedWeek) {
      formData.set('schedWeek', schedWeek);
    }

    const res = await this.callAxios('POST', '/main/cloud-remote/schedule', formData, undefined, true);
    return res;
  }

  /**
   * 更新排程
   */
  static async updateSchedule({
    deviceId, triggerName, action, schedFreq, schedDate, schedWeek, schedTime, enable,
  }) {
    const formData = new FormData();
    formData.set('deviceId', deviceId);
    formData.set('triggerName', triggerName);
    formData.set('action', action);
    formData.set('schedFreq', schedFreq);
    formData.set('schedTime', schedTime);
    formData.set('enable', enable);

    if (schedDate) {
      formData.set('schedDate', schedDate);
    }

    if (schedWeek) {
      formData.set('schedWeek', schedWeek);
    }

    const res = await this.callAxios('PATCH', '/main/cloud-remote/schedule', formData, undefined, true);
    return res;
  }

  /**
   * 移除排程
   */
  static async deleteSchedule({ triggerName }) {
    const formData = new FormData();
    formData.set('triggerName', triggerName);

    const res = await this.callAxios('DELETE', '/main/cloud-remote/schedule', formData, undefined, true);
    return res;
  }

  /**
   * 取得歷史排程列表
   */
  static async getHistoryScheduleList({ deviceId, page, size }) {
    const res = await this.callAxios('GET', `/main/cloud-remote/schedule/history-page?deviceId=${deviceId}&page=${page}&size=${size}`, undefined, undefined, true);
    return res;
  }

  /**
    *  電子報-月報-取得近一年用電量比較
   */
  static async getYearlyComparison({ startDate }) {
    const res = await this.callAxios('GET', `/main/e-monthly/line-chart?startDate=${startDate}`, null, undefined, true);
    return res;
  }

  /**
    *  電子報-月報-取得該月用電量比較
   */
  static async getMonthComparison({ startDate }) {
    const res = await this.callAxios('GET', `/main/e-monthly/compare?startDate=${startDate}`, null, undefined, true);
    return res;
  }

  /**
    *電子報-週報-單週用電量比較
   */
  static async getWeeklyComparison({ startDate }) {
    const res = await this.callAxios('GET', `/main/e-weekly/compare?startDate=${startDate}`, null, undefined, true);
    return res;
  }

  /**
    *  電子報-週報-近期用電量比較
   */
  static async getRecentComparison({ startDate }) {
    const res = await this.callAxios('GET', `/main/e-weekly/line-chart?startDate=${startDate}`, null, undefined, true);
    return res;
  }

  /**
   * 能源報告-取得週報
  */
  static async getWeeklyReport({ month }) {
    const res = await this.callAxios('GET', `/main/e-newspaper/week?month=${month}`, null, undefined, true);
    return res;
  }

  /**
   * 能源報告-取得哪幾個月有月報
  */
  static async getMonthlyReport() {
    const res = await this.callAxios('GET', '/main/e-newspaper/month', null, undefined, true);
    return res;
  }

  /*
   * 個資同意
   */
  static async setUserInfo({ status }) {
    const formdata = new FormData();
    formdata.set('status', status);


    const res = await this.callAxios('PATCH', '/main/user-info', formdata, undefined, true);
    return res;
  }

  /*
   * 取得特定用戶
   */
  static async getUser({ id }) {

    const res = await this.callAxios('GET', `/users/${id}`, null, undefined, false);
    return res;
  }
}

export default FrontendApi;
