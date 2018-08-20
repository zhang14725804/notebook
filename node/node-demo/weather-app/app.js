const yargs=require("yargs")

const geocode=require("./geocode/geocode")
const weather=require("./weather/weather")
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

console.log(argv.query)
geocode.geocodeAddress(argv.query,argv.tag,argv.region,(errorMessage,result)=>{
  if(errorMessage){
    console.log(errorMessage)
  }else{
    console.log(result.address)

    //lat lang callback
    weather.getWeather(result.latitude,result.langitude,(errorMessage,weatherResult)=>{
      if(errorMessage){
        console.log(errorMessage)
      }else{
        console.log(JSON.stringify(weatherResult))
      }
    })
  }
})
