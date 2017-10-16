import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './jumbotron.css';

class Jumbotron extends Component {
    
    render() {
        const img = this.props.img; 
        const style= {backgroundImage: `url(${img})`}
        return (
            <div styleName='jumbotron' style={style}>
                <div styleName='jumbo-top-buttons'>
                    <div styleName='jumbo-btn'>
                        <i className="fa fa-share" aria-hidden="true"></i>
                        Share
                    </div>
                    <div styleName='jumbo-btn'>
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                        Save
                    </div>
                </div>
                <div styleName='jumbo-bottom-btn'>
                    View Photos
                </div>
            </div>
        );
    }
}

export default CSSModules(Jumbotron, styles, true);