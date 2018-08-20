const expect = require('expect')
const supertest = require('supertest')
const {ObjectID}=require('mongodb')
const {app} =require("../server")
const {Todos} =require("../models/todo")

const todos=[{
  _id:new ObjectID(),
  text:'First 测试'
},{
  _id:new ObjectID(),
  text:'Second 测试',
  complete:true,
  completeAt:333
}]
beforeEach((done)=>{
  //移除所有数据？？
  Todos.remove({}).then(()=>{
    //insertMany
    return Todos.insertMany(todos)
  }).then(()=>done())
})
describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text='Test todo text'

    supertest(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err,res)=>{
        if(err){
          return done(err)
        }
        Todos.find({text}).then((todos)=>{
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done();
        }).catch((e)=>done(e))
      })
  })

  //这个测试没有通过，不知道为什么
  it("should not create todo with invalid body data",(done)=>{
    supertest(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err)
        }
        Todos.find().then((todos)=>{
          expect(todos.length).toBe(2)
          done()
        }).catch((e)=>done(e))
      })
  })
})

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    supertest(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe("GET /todos/:id",()=>{
  it('should return todo doc ',(done)=>{
    var hexId=todos[0]._id.toHexString()
    supertest(app)
      .get(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return 404 if not found',(done)=>{
    var hexId=new ObjectID().toHexString()
    supertest(app)
      .get(`/todos/${hexId}1`)
      .expect(404)
      .end(done)
  })

  it('should return todo doc ',(done)=>{
    var hexId=todos[0]._id.toHexString()
    supertest(app)
      .get(`/todos/${hexId}`)
      .expect(200)
      .end(done)
  })
})

describe("PATCH /todos/:id",()=>{
  it("should update the todo",(done)=>{
    var hexId=todos[0]._id.toHexString()
    var text ="this should be new Test"

    supertest(app)
      .patch(`/todos/${hexId}`)
      .send({
        complete:true,
        //ES6 语法
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.complete).toBe(true);
        expect(res.body.todo.completeAt).toBeA('string');
      })
      .end(done)
  })

  it("clear completeAt when todo is not completed ",(done)=>{
    
  })
})