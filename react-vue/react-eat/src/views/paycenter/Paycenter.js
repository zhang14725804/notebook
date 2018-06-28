import React from 'react';

import Header from 'components/header';


export default class PayCenter extends React.Component {


    render() {
        return <div style={{display: 'flex', flexDirection: 'column', height: 'inherit', width: '100%'}}>
            <Header title={"收银台"} {...this.props}/>
        </div>
    }
}

