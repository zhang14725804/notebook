import React from "react";
import './Card.less'

export default class Card extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div class="membership-wrapper">
            <div class="membership-content">
                <div class="number">13164649878</div>
                <div class="type">Business Enter</div>
                <div class="name"><i class="icon"></i><span>会员种类</span></div>
                <div class="ifcode">
                    <img width="49px" height="49px"/>
                    <div class="text">会员码</div>
                </div>
                <div class="ifmember">13164649878</div>
            </div>
            <div class="background">
                <picture>
                    <source width="100%" height="100%" media="(min-device-pixel-ratio: 1.5)"
                            srcSet="../my/whiteCard@1.5x.png"/>
                    <img width="100%" height="100%" src="../my/p_mmb_wt.png" alt="a cute kitten"/>
                </picture>
            </div>
        </div>
    }
}