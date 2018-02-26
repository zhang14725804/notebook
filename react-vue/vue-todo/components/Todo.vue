<template>
  <div>
      <!--当不在编辑模式的时候显示TODO列表-->
      <div v-show="!isEditing">
          <span>title:{{todo.title}}</span>
          <span>project-name:{{todo.project}}</span>
          <span @click="showForm">编辑</span>
          <span @click="deleteTodo(todo)">删除</span>
          <span @click="completeTodo(todo)">完成</span>
          <span>{{todo.done===true?"Completed":"complete"}}</span>
      </div>
      <div v-show="isEditing">
          <div><label>Title</label><input type="text" v-model="todo.title"/></div>
          <div><label>Project</label><input type="text" v-model="todo.project"/></div>
          <div @click="hideForm">关闭</div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
      todo:Object
  },
  data(){
      return{
          isEditing:false
      }
  },
  methods:{
      showForm(){
          this.isEditing=true
      },
      hideForm(){
          this.isEditing=false
      },
      deleteTodo(todo){
          this.$emit("delete-todo",todo)
      },
      completeTodo(todo){
          this.$emit("complete-todo",todo)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
