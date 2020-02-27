/** 用户地址 列表 **/

<template>
  <div class="user-address-view">
    <ul v-if="list.length>0" class="user-address-list">
      <li class="address-item" v-for="item in list" :key="item.addressId">
        <div class="user-info">
            {{item.userName}} <small>{{item.phone}}</small>
        </div>
        <div class="user-address">
          <label>{{item.province}}{{item.city}}{{item.street}}</label>
        </div>
        <div class="user-operation">
          <div class="operation-default">
            <div v-if="item.isDefault" class="button-item button-default active">
              <label>设为默认</label>
            </div>
            <div v-else class="button-item button-default" v-on:click="check(item.addressId)">
              <label>设为默认</label>
            </div>
          </div>
          <div class="operation-button">
            <div class="button-item button-edit" v-on:click="edit(item.addressId)">
              <label>编辑</label>
            </div>
            <div class="button-item button-delete" v-on:click="remove(item.addressId)">
              <label>删除</label>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <nothing-data v-else-if="!loading" :message="'还没添加地址，快去添加新地址吧'"></nothing-data>
    <!-- 添加按钮 -->
    <div class="button-add-address">
      <router-link :to="{name: 'form'}">
        <button type="button" name="button" class="wawa-button-danger button-size-normal">
          <label><big>+</big> 新增地址</label>
        </button>
      </router-link>
    </div>
    <!-- 删除确认 -->
    <mt-popup v-model="popupVisible" class="modal-window" popup-transition="popup-fade" :closeOnClickModal="false">
      <!-- 内容 -->
      <div class="room-live-tip">
        <div class="user-new-tip">
          <div class="tip-title">提示</div>
          <small>确定要删除当前地址吗 ？</small>
        </div>
      </div>
      <!-- 按钮  -->
      <div class="button-area">
        <button type="button" name="button-cancel" class="button-item" v-on:click="cancel">取消</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="deleteData">确定</button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import store from 'store';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import NothingData from "../../../components/NothingData.vue";
  export default {
    components: {
      NothingData
    },
    data() {
      return {
        loading: false,
        id: '',
        popupVisible: false,
        list: []
      }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      // 获取个人地址列表
      fetch: function() {
        var that = this
        that.loading = true
        Indicator.open({
          text: '正在加载...',
          spinnerType: 'snake'
        })
        this.$ajax.post('user/address/list', {}).then(res => {
          if (res && res.data) {
            that.loading = false
            Indicator.close()
            that.list = res.data.resBody.addressList
          }
        })
      },
      // 设为默认
      check: function(id) {
        var that = this
        // 逻辑：调用接口，成功后返回列表
        this.$ajax.post('user/address/save', {
          addressId: id,
          isDefault: 1
        }).then(res => {
          if (res && res.data) {
            // 设置成功
            if (res.data.resBody.success == 1) {
              Toast({
                message: '设置成功',
                iconClass: 'icon icon-success',
                duration: 300
              });
              that.fetch()
            } else {
              // 设置成功
              Toast({
                message: '设置失败',
                duration: 500
              })
            }
          }
        })
      },
      cancel: function() {
        this.id = ''
        this.popupVisible = false
      },
      // 删除
      remove: function(id) {
        var that = this
        that.id = id
        that.popupVisible = true
      },
      // 删除数据
      deleteData: function() {
        var that = this
        that.popupVisible = false
        Indicator.open({
          text: '正在删除...',
          spinnerType: 'snake'
        })
        setTimeout(function() {
          that.$ajax.post('user/address/delete', {
            addressId: that.id
          }).then(res => {
            if (res && res.data) {
              Indicator.close()
              if (res.data.resBody.success == 1) {
                Toast({
                  message: '删除成功',
                  iconClass: 'icon icon-success',
                  position: 'bottom',
                  duration: 400
                })
                that.fetch()
              } else {
                Toast({
                  message: '删除失败',
                  position: 'bottom',
                  duration: 400
                })
              }
            }
          })
        }, 400)
      },
      // 编辑
      edit: function(id) {
        var that = this
        var addressInfo = that.list.find((x) => {
          return x.addressId === id
        })
        store.set("address", addressInfo)
        this.$router.replace({
          name: 'form',
          params: {
            addressId: id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-address-view {
    background-color: #f9f9f9;
    height: 100vh;

    .user-address-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 1rem 1rem 8rem;
      background-color: #f9f9f9;

      .address-item {
        margin: 0.5rem 0;
        padding: 1rem;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        text-align: left;
        color: black;
        background-color: white;

        .user-info {
          font-size: 1.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-address {
          font-size: 1rem;
          color: #666;
          margin: 0.4rem 0 1rem;
        }

        .user-operation {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .operation-default {
            flex: 1;
          }

          .operation-button {
            min-width: 10rem;
            text-align: center;
          }

          .button-item {
            padding: 0.4rem 0.4rem 0.4rem 2.2rem;
            position: relative;
            display: inline-block;
            font-size: 1rem;
          }

          .button-item::before {
            background-image: url('/static/images/user-icon-list.png');
            background-repeat: no-repeat;
            content: "";
            position: absolute;
            width: 1.6rem;
            height: 1.6rem;
            left: 0;
            top: 2px;
            background-size: 20rem 7rem;
          }

          .button-default::before {
            background-position: -9.4rem -2.3rem;
          }

          .button-default.active::before {
            background-position: -7.5rem -2.3rem;
          }

          .button-edit::before {
            background-position: -4.2rem -4.4rem;
          }

          .button-delete::before {
            background-position: -8.7rem -4.4rem;
          }
        }
      }
    }

    .button-add-address {
      position: fixed;
      bottom: 2rem;
      left: 0;
      right: 0;
      width: 100%;
      box-sizing: border-box;
    }
    /** 弹窗 **/
    .modal-window {
      text-align: left;
      background-position: center;
      padding: 1rem;

      .user-new-close {
        position: fixed;
        background-image: url('/static/images/user-icon-list.png');
        background-repeat: no-repeat;
        width: 2rem;
        height: 2rem;
        right: -1rem;
        top: -1rem;
        background-size: 25rem 10rem;
        background-position: -14.3rem -3.6rem;
      }

      .room-live-tip {
        font-size: 1.5rem;

        .user-new-tip {
          color: black;
          font-weight: bold;
          text-align: center;

          .tip-title {
            font-size: 1.4rem;
            text-align: center;
            padding: 8px;
          }

          small {
            font-size: 16px;
            color: #444;
          }
        }
      }

      .button-item {
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>
