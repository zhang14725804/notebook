import React from "react";

export default class ListTab extends React.Component {

    constructor(props) {
        super(props);
        this.handleTabClick.bind(this);
    }

    handleTabClick() {
        const {tabClick, index} = this.props;
        if(tabClick){
            tabClick(index);
        }
    }

    render() {
        const that = this;
        const {index, selectIndex, title, clzDef, clzSlt} = this.props;
        let clz = clzDef;
        if (index === selectIndex) {
            clz = clzSlt;
        }
        let txt = "";
        if (title !== undefined && title !== "") {
            txt = title;
        }

        return <div className={clz} onClick={that.handleTabClick.bind(that)}>{title}</div>
    }
}