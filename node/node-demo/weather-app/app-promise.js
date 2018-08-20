const yargs=require("yargs")
const axios=require("axios")

const argv=yargs.options({
  q:{
    demand:true,
    alias:'query',
    describe:'query words for search',
    string:true
  },
  t:{
    demand:true,
    alias:'tag',
    describe:'标签',
    string:true
  },
  r:{
    demand:true,
    alias:'region',
    describe:'范围',
    string:true
  }
}).help().alias('help','h').argv;

//运行 node app.js -q 'ATM机' -t '银行' -r '北京'
var encodedQuery=encodeURIComponent(argv.query)
var encodedTag=encodeURIComponent(argv.tag)
var encodedRegion=encodeURIComponent(argv.region)

var geocodeUrl=`http://api.map.baidu.com/place/v2/search?query=${encodedQuery}&tag=${encodedTag}&region=${encodedRegion}&output=json&ak=iMMglxN7Z4uvyM97zdtF19h4UVGiVRtC`


axios.get(geocodeUrl).then((response)=>{
  //console.log(response.data)
  let lat=response.data.results[0].location.lat
  let lng=response.data.results[0].location.lng
  console.log("lat:"+lat)
  console.log("lng:"+lng)
  var weatherUrl=`https://api.darksky.net/forecast/480fa29c3056f35adc91e1d0bcb8aba8/${lat},${lng}`
  return axios.get(weatherUrl)
}).then((response)=>{
  //console.log(response.data)
  console.log(response.data.currently.temperature)
  console.log(response.data.currently.apparentTemperature)
}).catch((error)=>{
  console.log(error)
  console.log('weather API网络错误')
})