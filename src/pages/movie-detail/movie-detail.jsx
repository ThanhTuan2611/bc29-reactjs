import React from 'react'
import Detail from '../../modules/detail/detail'
import ShowTime from '../../modules/show-times/show-time'

export default function MovieDetail() {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                       <Detail/> 
                    </div>
                    <div className="col-12 mt-5">
                        <ShowTime/>
                    </div>
                </div>
            </div>
        </div>

    )
}
