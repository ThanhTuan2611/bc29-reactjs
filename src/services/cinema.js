import { request } from "../configs/axios"

const fetchMovieShowTimeApi = (movieId)=>{
    return request({
        url:`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
        method:'GET',
    });
};
export {fetchMovieShowTimeApi};