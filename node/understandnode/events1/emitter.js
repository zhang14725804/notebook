function Emiiter(){
    this.events={}
}
Emiiter.prototype.on=function(type,listener){
    this.events[type]=this.events[type] || []
    this.events[type].push(listener)
}
Emiiter.prototype.emit=function(type){
    if(this.events[type]){
        this.events[type].forEach(function(listener){
            listener()
        })
    }
}
module.exports=Emiiter