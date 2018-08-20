const request = require('request');

var geocodeAddress=(query,tag,region,callback)=>{
  //运行 node app.js -q 'ATM机' -t '银行' -r '北京'
  var encodedQuery=encodeURIComponent(query)
  var encodedTag=encodeURIComponent(tag)
  var encodedRegion=encodeURIComponent(region)
  // /http://api.map.baidu.com/place/v2/search?query=ATM机&tag=银行&region=北京&output=json&ak=
  //请求地址：：http://api.map.baidu.com/place/v2/search?query=ATM%E6%9C%BA&tag=%E9%93%B6%E8%A1%8C&region=%E5%8C%97%E4%BA%AC&output=json&ak=iMMglxN7Z4uvyM97zdtF19h4UVGiVRtC
  request({
    url:`http://api.map.baidu.com/place/v2/search?query=${encodedQuery}&tag=${encodedTag}&region=${encodedRegion}&output=json&ak=iMMglxN7Z4uvyM97zdtF19h4UVGiVRtC`,
    method: "GET",
    json:true
  },(error,response,body)=>{
    if(error){
      callback('网络错误')
    }else{
      callback(undefined,{
        address:body.results[0].address,
        latitude:body.results[0].location.lat,
        langitude:body.results[0].location.lng
      })
    }
  })
}

module.exports.geocodeAddress=geocodeAddress;
