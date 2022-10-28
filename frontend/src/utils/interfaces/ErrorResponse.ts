export interface ErrorResponse {
  code: number;
  data: ErrorDataResponse;
}

export interface ErrorDataResponse {
  folio: string;
  mensaje: string;
  resultado: string;
}
