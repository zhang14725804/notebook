  <template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <!-- tab bar -->
    <div class="mint-tabbar is-fixed" v-if="tabbar">
      <div v-on:click="checkMenu('home')" class="mint-tab-item" >
        <img src="/static/images/mint-tabbarl.png" height="100%">
      </div>
      <div v-on:click="checkMenu('user')"  class="mint-tab-item" >
        <img v-if='menuName==="我的"' src="/static/images/mint-tabbarr.png" height="100%">
        <div v-else>{{menuName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  export default {
    data() {
      return {
        tabbar: false,
        menu: '',
        login: false,
        menuName: ''
        }
    },
    watch: {
      $route(to, from) {
        var that = this
        // 首页 、 个人中心
        if (to.name == 'home' || to.name == 'user') {
          that.menu = to.name
          that.tabbar = true
        } else {
          that.tabbar = false
        }
      }
    },
    created() {},
    beforeMount() {
      this.setMenuName()
    },
    mounted() {
      this.setMenuName()
    },
    activated() {
      this.setMenuName()
    },
    methods: {

      checkMenu: function(name) {
        this.menu = name
        this.$router.replace({
          name: name
        })
      },

      setMenuName: function() {
        var that = this,
          userInfo = store.get('user') || null

        if (userInfo && userInfo != null) {
          that.login = true
          that.menuName = "我的"
        } else {
          that.login = false
          that.menuName = "下载APP"
        }
        $("body").find("div[name='menu']").each(function(index) {
          if (!that.login) {
            $(this).parent().addClass("user-logout")
          } else {
            $(this).parent().removeClass("user-logout")
          }
          $(this).html(that.menuName)
        })
      }
    }
  }
</script>

<style>






  .app {
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }

  .router-fade-enter-active {
    transition: all .4s ease;
  }

  .router-fade-enter,
  .router-fade-leave-to {
    transform: translateX(80px);
  }

  .user-logout {
    color: red;
  }
</style>
