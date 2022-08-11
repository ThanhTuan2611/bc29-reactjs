
import { request } from "../configs/axios";
// tạo 1 file axios bên trong folder config nhầm tạo 1 axios có sẵn headers bên trong nhầm tránh lặp lại code.Bên file kia đặt trên gì thì file này mình return cái đó
const fetchMovieListApi = () => {
    return request({
        url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP02",
        method: 'GET',
    });
};

const fetchMovieDetailApi = (movieId) => {
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET',
    });
};
export { fetchMovieListApi, fetchMovieDetailApi };