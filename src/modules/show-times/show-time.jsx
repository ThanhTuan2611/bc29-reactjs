import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchMovieShowTimeApi } from '../../services/cinema';
import moment from 'moment';
export default function ShowTime() {
    const params = useParams();
    const [showTimes, setShowTimes] = useState({});

    useEffect(() => {
        fetchMovieShowTimes();
    }, []);

    const fetchMovieShowTimes = async () => {
        const result = await fetchMovieShowTimeApi(params.movieId);
        console.log(result);
        setShowTimes(result.data.content);
    };

    const renderTab = () => {
        return showTimes?.heThongRapChieu?.map((ele, idx) => { // khi sử dụng hàm map thì phải nhớ đặt key
            return (
                <a key={ele.maHeThongRap} className={`nav-link text-capitalize ${idx === 0 && 'active'}`} data-toggle="pill" href={`#${ele.maHeThongRap}`} role="tab" aria-selected="true">{ele.tenHeThongRap}</a>
            )
        })
    };

    // mảng chồng mảng 
    const renderContent = () => {
        return showTimes?.heThongRapChieu?.map((ele, idx) => { // Khi sử dụng map thì phải nhớ return
            return (
                <div className={`tab-pane fade show ${idx === 0 && 'active'}`} id={ele.maHeThongRap} key={ele.maHeThongRap} role="tabpanel">
                    {
                        ele.cumRapChieu.map((ele) => {  // ele lấy cái giá trị của scope gần nhất của nó
                            return (
                                <div key={ele.maCumRap} className="row mb-5">
                                    <div className="col-1">
                                        <img className="img-fluid rounded" src={ele.hinhAnh} />
                                    </div>
                                    <div className="col-11 pl-0">
                                        <h5>{ele.tenCumRap}</h5>
                                        <span className="text-muted">{ele.diaChi}</span>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            {
                                                ele.lichChieuPhim.map((ele) => {
                                                    return (
                                                        <div key={ele.maLichChieu} className="col-3">
                                                            {/* Moment giúp định đạng ngày tháng năm cách cài npm install monent và import vào file */}
                                                            {/* Link của react-router-dom dùng để chuyển từ page này sang page khác tương tự như Navlink của thằng navbar */}
                                                            <Link to ={`/booking/${ele.maLichChieu}`}> 
                                                            {moment(ele.ngayChieuGioChieu).format('LLL')}
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            };
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    };
                </div>
            );
        });
    };

    return (
        <div className="row">
            <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    {renderTab()}
                </div>
            </div>
            <div className="col-9">
                <div className="tab-content" id="v-pills-tabContent">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
