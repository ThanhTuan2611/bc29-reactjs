
import "./index.scss";
import React, { useState } from 'react'

export default function Chair(props) {
    const [isSelected, setIsSelected] = useState(false)

    const populateClass = () => {
        let defaultClass = 'ghe';

        if (props.item.loaiGhe === "Vip") {
            defaultClass += " gheVip"; // so sánh ghế Vip hoặc ghế thường
        };

        if (isSelected) {
            defaultClass += " gheDangDat"
        }


        // Nên cho ghế đã đặt ở phía dưới để tránh bị đè css
        if (props.item.daDat) {
            defaultClass += " daDat"; // so sánh ghế đã đặt hay chưa
        };

        return defaultClass;
    }
    return (
        <button
            disabled={props.item.daDat}
            onClick={() => {
                setIsSelected(!isSelected);
                props.handleSelect(props.item)
            }
            }
            className={populateClass()}>
            {props.item.tenGhe}
        </button>
    )
}
