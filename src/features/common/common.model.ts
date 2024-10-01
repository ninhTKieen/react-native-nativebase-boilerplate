export interface IBaseHttpResponse<T> {
  data: T;
  message: string;
  code: number;
}

export interface IBaseHttpResponseList<T> {
  data: {
    items: T[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
  message: string;
  code: number;
}

export type TLocalImgProps = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
};

export type TUploadImageResult = {
  imagePublicId: string;
  imagePublicUrl: string;
  imageSecureUrl: string;
  width: number;
  height: number;
  format: string;
};