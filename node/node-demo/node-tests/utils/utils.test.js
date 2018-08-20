const expect=require("expect")

const utils=require('./utils')

it('should add two number',()=>{
  var res=utils.add(23,32)
  // if(res!==55){
  //   throw new Error(`Expect 55 but get ${res}`)
  // }

  expect(res).toBe(55)
})

it('should add two number',()=>{
  var res=utils.square(3)
  // if(res!==9){
  //   throw new Error(`Expect 55 but get ${res}`)
  // }
  expect(res).toBe(9)
})