import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetailApi } from '../../services/movie'

export default function Detail() {
    const [movieDetail, setMovieDetail] = useState({});
    const params = useParams();

    useEffect(() => {
        fetchMovieDetail();
    }, []);

    const fetchMovieDetail = async () => {
        const result = await fetchMovieDetailApi(params.movieId); // .movieId là vì nó phải giống thành path trong file index của folder router
        setMovieDetail(result.data.content);
    }

    return (
        <div className="row">
            <div className="col-3">
                <img className="w-100" src={movieDetail.hinhAnh} />
            </div>
            <div className="col-9">
                <h4>{movieDetail.tenPhim}</h4>
                <p>
                    {movieDetail.moTa}
                </p>
                <p>{movieDetail.ngayKhoiChieu}</p>
                <div>
                    <button className="btn btn-info mr-2">TRAILER</button>
                </div>
            </div>
        </div>

    )
}
