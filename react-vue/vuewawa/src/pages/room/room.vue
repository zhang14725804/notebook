/** 直播间 **/

<template>
  <div>...</div>
</template>

<script>
  import store from 'store'
  export default {
    data() {
      return {
        groupId: ''
      }
    },
    beforeMount: function() {
      this.groupId = this.$route.params.id
      if (this.groupId == '') {
        this.$router.replace({
          name: 'home'
        })
        return
      }
    },
    mounted() {
      var that = this,
        list = store.get('roomlist') || [],
        room = list.find((x) => {
          return x.groupId === that.groupId
        }) || null

      if (room == null) {
        this.$router.replace({
          name: 'home'
        })
        return
      }

      if (that.GLOBAL.IOS()) {
        $("#lvb_video").attr("src", room.frontPullHlsUrl)
        that.$router.replace({
          name: 'iroom',
          params: {
            id: that.groupId
          }
        })
      } else {
        that.$router.replace({
          name: 'aroom',
          params: {
            id: that.groupId
          }
        })
      }
    },
    methods: {}
  }
</script>
