import React from 'react'
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import './pie.scss'
class Pie extends React.Component{
    constructor(props) {
        super(props)
        this.setPieOption = this.setPieOption.bind(this)
        
        this.state={
            lastColor:'#E4E4E4',
            usedColor:'#8198FC',
            warnColor:'#FE5826',
        }
    }
    componentDidMount(){
        // const data=[
        //     {value:148,type:'used', name:'已使用'},
        //     {value:400,type:'total', name:'剩余容量'}
        // ]
        const data=[
            {type:'used', name:'已使用'},
            {type:'total', name:'剩余容量'}
        ]
        let {pieData}=this.props
        
        //let params=pieData?[Object.assign(data[0],pieData[0]),Object.assign(data[1],pieData[1])]:data
        let params=pieData?[Object.assign(data[0],pieData[0]),Object.assign(data[1],pieData[1])]:data
        let pieChart=echarts.init(this.refs.container)
        let options = this.setPieOption(params,this.state.lastColor,this.state.usedColor,this.state.warnColor,this.props.title)
        pieChart.setOption(options)
    }
    setPieOption(data,lc,uc,wc,title) {
        return {
            title: {
                text:title,
                left:'center',
                top:'center',
                textStyle:{
                  color:'#333',
                  fontSize:14,
                  align:'center',
                  fontFamily: 'PingFangSC-Medium'
                }
            },
            // tooltip : {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b} : {c} ({d}%)"
            // },
            series : [
                {
                    name: '比例',
                    type: 'pie',
                    stillShowZeroSum:false,
                    radius: ['50%', '75%'],
                    avoidLabelOverlap: false,
                    data: data, //传入外部的data数据
                    itemStyle:{
                        normal:{
                            color:function(params){
                                //返回什么颜色，警告，已使用，剩余
                                if(params.percent>80 && params.data.type==='used'){
                                    return wc
                                }else if(params.data.type==='used'){
                                    return uc
                                }else if(params.data.type==='total'){
                                    return lc
                                }
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    }
                }
            ]
        }
    }
    render(){
        return (
            <div className="pie-container-wrapper">
                {/*设置pw和ph为了响应式echarts */}
                <div ref="container" style={{width:`${this.props.pw?this.props.pw:'150'}px`,height:`${this.props.ph?this.props.ph:'150'}px`}}></div>
            </div>
        )
    }
}
export default Pie