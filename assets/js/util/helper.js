class Helper {
  static generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * 手機驗證
   *
   */
  static telephoneVerify(telephoneNumber) {
    const regex = /^(\+886-?|0)9-?\d{2}-?\d{3}-?\d{3}$/;
    const reg = new RegExp(regex);
    return reg.test(telephoneNumber);
  }

  /**
   * 信箱驗證
   *
   */
  static emailVerify(email) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[\w]+([\w\.\-]){1,64}@[\w-]+((\.[\w-])|(\.[\w]+)){1,}$/;
    const reg = new RegExp(regex);
    return reg.test(email);
  }
}

export default Helper;
