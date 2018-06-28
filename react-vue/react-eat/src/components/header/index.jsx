import React from "react";

/**
 * title , preback，rightClz,rigthTxt, rightClick
 */
export default class Header extends React.Component {

    handlebBackClick() {
        var props = this.props;
        if (props === undefined || props == null) {
            return;
        }
        var history = props.history;
        var preback = props.preback;
        if (history === undefined || history == null) {
            return;
        }
        if (preback != null) {
            preback(history);
            return;
        }
        history.goBack();
    }

    handleRightClick() {
        const {rightClick} = this.props;
        if (rightClick) {
            rightClick();
        }
    }

    render() {
        const that = this;
        const props = that.props;
        let visible = that.props.visibleBack || "visible";

        return <div style={{
            position: "relative",
            color: "#FFFFFF",
            height: "0.88rem",
            lineHeight: "0.88rem",
            fontSize: "0.36rem",
            backgroundColor: "#000000"
        }}>
            <i className='icon-fanhui'
               style={{
                   position: "absolute",
                   left: "0.3rem",
                   padding: "0 0.1rem",
                   fontSize: "0.36rem",
                   visibility: visible
               }}
               onClick={that.handlebBackClick.bind(that)}></i>
            <div style={{textAlign: "center", width: "100%"}}>
                {props.title}
            </div>
            <div style={{position: "absolute", right: "0.2rem", top: "0"}}
                 onClick={that.handleRightClick.bind(that)}>
                <i className={props.iconRight} style={{fontSize: "0.36rem"}}>{props.rightTxt}</i>
            </div>
        </div>
    }
}