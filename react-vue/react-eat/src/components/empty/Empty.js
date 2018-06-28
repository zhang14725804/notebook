import React from 'react';


import './Empty.less'


export default class Empty extends React.Component {

    handleBtnClick(event) {
        let {btnClick} = this.props;
        if (btnClick) {
            btnClick();
        }
        event.stopPropagation();
    }


    renderBtn() {
        const {text, textTop} = this.props;
        if (text === undefined || text === null || text === "" || text === "null") {
            return;
        }
        let style;
        if (textTop) {
            style = {
                marginTop: textTop
            }
        }
        return <span className='empty-btn-bg' style={style} onClick={this.handleBtnClick.bind(this)}>{text}</span>;
    }

    renderSubText() {
        let {subText, subTextTop} = this.props;
        if (subText === undefined || subText === null || subText === "" || subText === "null") {
            return;
        }
        let style;
        if (subTextTop) {
            style = {
                marginTop: subTextTop
            }
        }
        return <span className='empty-sub-text-bg' style={style}>{subText}</span>;
    }

    render() {

        let {text, subText, imgSrc, imgSubSrc, imgTop, imgSubTop, textTop, subTextTop} = this.props;
        let btn = this.renderBtn();
        let sub = this.renderSubText();

        return <div className={'empty-bg'}>
            <img src={imgSrc} style={{marginTop: imgTop}}/>
            <img src={imgSubSrc} style={{marginTop: imgSubTop}}/>
            {sub}
            {btn}
        </div>
    }

}







