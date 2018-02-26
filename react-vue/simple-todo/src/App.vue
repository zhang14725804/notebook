<template>
  <div id="app">
    <get-todo/>
    <current-todos/>
    <completed-todos/>
  </div>
</template>

<script>
import GetTodo from './components/GetTodo'
import CurrentTodos from './components/CurrentTodos'
import CompletedTodos from './components/CompletedTodos'

export default {
  components:{
    GetTodo,
    CurrentTodos,
    CompletedTodos
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
