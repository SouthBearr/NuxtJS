import { $axios } from "../axios/index";
import type { IMoviesListType, IMovieDetailType } from "./types";

const getListMoviesAsync = (page: number): Promise<IMoviesListType> => {
  return new Promise((resolve, reject) => {
    $axios({
      method: "GET",
      url: `/titles?page=${page}`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getDetailMoviesAsync = (
  id: string | string[]
): Promise<IMovieDetailType> => {
  return new Promise((resolve, reject) => {
    $axios({
      method: "GET",
      url: `/titles/${id}`,
    })
      .then((res) => {
        resolve(res.data?.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getListMoviesAsync, getDetailMoviesAsync };
