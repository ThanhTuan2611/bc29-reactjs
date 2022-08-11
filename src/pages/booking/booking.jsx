import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Chair from '../../modules/chair/chair';
import { bookingTicketApi, fetchRoomListApi } from '../../services/booking';
export default function Booking() {
    const [danhSachGhe, setDanhSachghe] = useState([]);
    const [roomList, setRoomList] = useState();
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        fetchRoomList();
    }, []);

    const fetchRoomList = async () => {
        const result = await fetchRoomListApi(params.maLichChieu);
        console.log(result);
        setRoomList(result.data.content);
    };

    const handleSelect = (selectedChair) => {
        const data = [...danhSachGhe]; // tạo 1 cái danh sách mới ko ảnh hưởng tới state cũ

        const idx = data.findIndex((ele) => ele.tenGhe === selectedChair.tenGhe);
        if (idx !== -1) {
            data.splice(idx, 1);
        } else {
            data.push(selectedChair);
        }

        setDanhSachghe(data);
    };

    const handleBookingTicket = async () => {
        const danhSachVe = danhSachGhe.map((ele) => {
            return {
                maGhe: ele.maGhe,
                giaVe: ele.giaVe,
            };
        });
        const submitData = {
            maLichChieu: params.maLichChieu,
            danhSachVe,
        };
        await bookingTicketApi(submitData);
        alert("Đặt vé thành công")
        navigate('/');
    }

    return roomList ? (
        <div className='row w-75 mx-auto my-5'>
            <div className="col-8">
                {roomList.danhSachGhe.map((ele, idx) => {
                    return (
                        <React.Fragment key={ele.tenGhe}>
                            <Chair handleSelect={handleSelect} item={ele} />
                            {(idx + 1) % 16 === 0 && <br />}
                        </React.Fragment>
                    );
                })}

            </div>
            <div className="col-4">
                <img className="img-fluid" src={roomList.thongTinPhim.hinhAnh} alt="image" />
                <h4>Tên phim: {roomList.thongTinPhim.tenPhim}</h4>
                <h5>Mô tả: {roomList.thongTinPhim.moTa}</h5>
                <p>
                    Ghế:
                    {danhSachGhe.map((ele) =>
                        <span key={ele.tenGhe} className='badge badge-success'>{ele.tenGhe}</span>)}
                </p>
                <p>Tổng tiền: {danhSachGhe.reduce((previousValue, currrentValue) => {
                    previousValue += currrentValue.giaVe;
                    return previousValue;
                }, 0).toLocaleString()}</p>
                {/* toLocaleString() định dạng lại số thêm dấu phẩy vào số*/}
                <button
                    onClick={handleBookingTicket}
                    className="btn btn-info">ĐẶT VÉ</button>
            </div>
        </div>
    ) : ("Loading .....")
}
