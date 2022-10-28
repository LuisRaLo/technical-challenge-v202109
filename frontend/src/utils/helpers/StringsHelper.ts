export default class StringsHelper {
  public static isNullOrEmpty(str: string): boolean {
    return str === null || str === undefined || str === '';
  }

  public static isNullOrWhitespace(str: string): boolean {
    return str === null || str === undefined || str.trim() === '';
  }

  public static isdigit(str: string): boolean {
    return /^\d+$/.test(str);
  }

  public static isAlpha(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str);
  }

  public static isnullValuesObject(obj: any): {
    vacio: boolean;
    key: string;
  } {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
          return {
            vacio: true,
            key: key,
          };
        }
      }
    }
    return {
      vacio: false,
      key: '',
    };
  }

  public static isNullOrEmptyStrings(...str: string[]): boolean {
    for (const s of str) {
      if (this.isNullOrEmpty(s)) {
        return true;
      }
    }
    return false;
  }

  public static generarFolio(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const milisecond = date.getMilliseconds();
    return (
      `${year}${month}${day}${hour}${minute}${second}${milisecond}` +
      Math.floor(Math.random() * (99 - 10) + 10)
    );
  }
}
