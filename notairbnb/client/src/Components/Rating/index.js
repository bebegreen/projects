import React from 'react'
import classNames from 'classnames'; 
import CSSModules from 'react-css-modules';

function Rating(props) {
    const MAX_STARS = 5;
    const starsArr= [];
    const markedStars = props.value;
    const style = props.style; 

    for (let i = 0; i < MAX_STARS; ++i) {
        
        const classes = classNames({ 
            "fa-star-o": i >= markedStars, 
            "fa-star": i < markedStars, 
             
        })

        const star = <i key={i} className={'fa ' + classes}></i>
        starsArr.push(star);
    }

    return (
        <div style={{margin: '0 3px'}}>
            {starsArr}
        </div>
    )
};

export default CSSModules(Rating);