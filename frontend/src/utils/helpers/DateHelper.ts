export default class DateHelpers {
  private static LOCALE = 'es-MX';

  public static readonly MESES: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  public static readonly MESESShort: string[] = [
    'Ene.',
    'Feb.',
    'Mar',
    'Abril',
    'Mayo',
    'Jun',
    'Jul.',
    'Ago',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dic.',
  ];
  public static readonly dayNames: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];
  public static readonly dayNamesShort: string[] = [
    'Dom',
    'Lun',
    'Mar',
    'Mie',
    'Jue',
    'Vie',
    'Sab',
  ];

  public static getDateFromString(date: string): Date {
    const dateParts: string[] = date.split('-');
    const year: number = parseInt(dateParts[0], 10);
    const month: number = parseInt(dateParts[1], 10) - 1;
    const day: number = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }

  public static getCurrentDateString(): string {
    const date: Date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  public static getCurrentDateWithFormat(separator?: string): string {
    const date: Date = new Date();
    if (separator)
      return `${date.getFullYear()} ${separator} ${date.getMonth()} ${separator} ${date.getDate()}`;
    else return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
  }

  public static getNextDateWithFormat(
    dayPlus: number,
    separator?: string,
  ): string {
    const date: Date = new Date();
    date.setDate(date.getDate() + dayPlus);
    if (separator)
      return `${date.getFullYear()} ${separator} ${
        date.getMonth() + 1
      } ${separator} ${date.getDate()}`;
    else
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  public static getCurrenTimeStampString(): string {
    const date: Date = new Date();
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  public static getCurrentDateStringLarge(): string {
    const date: Date = new Date();
    return (
      date.getDate() +
      ' de ' +
      DateHelpers.MESES[date.getMonth()] +
      ' del ' +
      date.getFullYear()
    );
  }

  public static getTomorrow(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  public static getNow(): Date {
    return new Date();
  }

  public static getMonth(month: number | void) {
    if (month) return this.MESES[month];
    else return this.MESES[new Date().getMonth()];
  }

  public static getDay() {
    return new Date().getDate();
  }
  public static getYear() {
    return new Date().getFullYear();
  }
  public static getDateminusYear(years: number): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  public static StringToDate(date: string): Date {
    const dateParts: string[] = date.includes('-')
      ? date.split('-')
      : date.split('/');
    const year: number = parseInt(dateParts[0], 10);
    const month: number = parseInt(dateParts[1], 10) - 1;
    const day: number = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }

  public static isValidRangeDate(
    dateCheck: Date,
    dateToday: Date,
    operator: string,
  ): boolean {
    switch (operator) {
      case '>':
        return dateCheck > dateToday;
      case '<':
        return dateCheck < dateToday;
      case '>=':
        return dateCheck >= dateToday;
      case '<=':
        return dateCheck <= dateToday;
      case '==':
        return dateCheck == dateToday;
      case '!=':
        return dateCheck != dateToday;
      default:
        return false;
    }
  }
}
