import React from 'react';
import {TabBar, Icon} from 'antd-mobile';


import MyEat from '../my/MyEat';
import Category from '../category/Category';
import Home from '../home/Home';
import ShoppingCart from '../store/ShoppingCart';

import './Main.less';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
        };
    }

    renderContent(pageText) {
        let node;
        switch (pageText) {
            case 'my':
                node = <div style={{height: '100%'}}>
                    {<MyEat  {...this.props} />}
                </div>;
                break;
            case 'category':
                node = <div style={{height: '100%'}}>
                    {<Category  {...this.props} />}
                </div>;
                break;
            case 'home':
                node = <div style={{height: '100%'}}>
                    {<Home  {...this.props} />}
                </div>;
                break;
            case 'shopping':
                node = <div style={{height: '100%'}}>
                    {<ShoppingCart  {...this.props} />}
                </div>;
                break;
            default:
                node = (
                    <div style={{backgroundColor: 'white', flex: 1, height: '100%', textAlign: 'center'}}>
                        <div style={{paddingTop: 60}}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
                        <a style={{display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9'}}
                           onClick={(e) => {
                               e.preventDefault();
                               this.setState({
                                   hidden: !this.state.hidden,
                               });
                           }}
                        >
                            点击切换 tab-bar 显示/隐藏
                        </a>
                    </div>
                );
        }

        return node;
        // return pageText === "my" ?
        {/*<div style={{height: '100%'}}>*/
        }
        {/*{<MyEat  {...this.props} />}*/
        }
        {/*</div>*/
        }
        //     : (
        //         <div style={{backgroundColor: 'white', flex: 1, height: '100%', textAlign: 'center'}}>
        //             <div style={{paddingTop: 60}}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        //             <a style={{display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9'}} onClick={(e) => {
        //                 e.preventDefault();
        //                 this.setState({
        //                     hidden: !this.state.hidden,
        //                 });
        //             }}
        //             >
        //                 点击切换 tab-bar 显示/隐藏
        //             </a>
        //         </div>
        //     );
    }

    render() {
        return (
            <div className='demoContainer'>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#D42A1D"
                    barTintColor="white"
                    hidden={this.state.hidden}>
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(./tab_home_def.png) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(tab_home_slt.png) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('home')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon type="koubei-o" size="md"/>}
                        selectedIcon={<Icon type="koubei" size="md"/>}
                        title="分类"
                        key="分类"
                        icon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(./tab_cate_def.png) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(tab_cate_slt.png) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('category')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(./tab_cart_def.png) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(./tab_cart_slt.png) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                        }
                        title="购物车"
                        key="购物车"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                        {this.renderContent('shopping')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{uri: './my/tab_personal_def.png'}}
                        selectedIcon={{uri: './my/tab_personal_slt.png'}}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >
                        {this.renderContent('my')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default App;