import Moment from 'react-moment'
import React, { Component } from 'react'
import Rating from '../../Components/Rating/'
import CSSModules from 'react-css-modules';
import styles from './review.css'

function Reviews ({ location: { reviews } }) {

    return (
        <div>

            <h2>{reviews.length} reviews <Rating value='4' /> </h2>

            {reviews.map((review, i) => (

                <div key={i} styleName='review'>

                    <div styleName='review-head'>

                        <div styleName='user-detail'>
                            <img src={review.userImageUrl} />
                            {/* <i styleName="fa fa-user-circle" aria-hidden="true"></i> */}
                            <h2>{review.name}</h2>
                        </div>

                        <Moment from={review.date}>{review.date}</Moment>

                    </div>

                    <Rating value={review.rating} />

                    <p>{review.content}</p>
                </div>
            )
            )}
        </div>
    )


};

export default CSSModules(Reviews, styles);