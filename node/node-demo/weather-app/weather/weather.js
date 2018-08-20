const request=require("request")
//480fa29c3056f35adc91e1d0bcb8aba8
//https://api.darksky.net/forecast/480fa29c3056f35adc91e1d0bcb8aba8/42.3601,-71.0589
var getWeather=(lat,lang,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/480fa29c3056f35adc91e1d0bcb8aba8/${lat},${lang}`,
    method:'GET',
    json:true
  },(error,response,body)=>{
    if(error){
      callback('网络错误')
    }else{
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature,
      })
    }
  })
}

module.exports.getWeather=getWeather;