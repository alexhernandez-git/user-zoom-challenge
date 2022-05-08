import { Document } from "mongoose";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
export interface TypedRequestParams<T> extends Express.Request {
  params: T;
}
export interface TypedResponseData<T> extends Express.Response {
  data: T;
}

export type TFavourite = {
  _id?: string;
  org: string;
  repo: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
};
