<template>
  <div>
      <button @click="openForm" v-show="!isCreating">添加</button>
      <div v-show="isCreating">
          <div><label>Title</label><input type="text" ref="title" v-model="titleText" defaultValue=""/></div>
          <div><label>Project</label><input type="text" ref="project" v-model="projectText"  defaultValue=""/></div>
          <button @click="sendForm">create</button>
          <button @click="closeForm">cancle</button>
      </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          isCreating:false,
          titleText:'',
          projectText:''
      }
  },
  methods:{
      openForm(){
          this.isCreating=true
      },
      closeForm(){
          this.isCreating=false
      },
      sendForm(){
          if(this.titleText.length>0 && this.projectText.length>0){
              const title=this.titleText
              const project=this.projectText
              this.$emit('create-todo',{title,project,done:false})
          }
          this.isCreating=false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
