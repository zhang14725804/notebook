/** 用户地址 表单 **/

<template>
  <div class="user-address-view">
    <!-- 用户地址 -->
    <div class="user-important-tip">
      <label>娃娃由商家统一发货，请填写有效地址</label>
    </div>
    <!--  地址表单 -->
    <form class="user-address-form" action="" method="post">
      <div class="user-address-form-item">
        <div class="user-address-form-item-header">
          <h3 class="user-icon-name">联系人（真实姓名）</h3>
        </div>
        <div class="user-address-form-item-body">
          <mt-field placeholder="如：张三" v-model="address.userName"></mt-field>
        </div>
      </div>
      <div class="user-address-form-item">
        <div class="user-address-form-item-header">
          <h3 class="user-icon-phone">联系电话</h3>
        </div>
        <div class="user-address-form-item-body">
          <mt-field placeholder="如：188 8888 8888" type="tel" v-model="address.phone"></mt-field>
        </div>
      </div>
      <div class="user-address-form-item">
        <div class="user-address-form-item-header">
          <h3 class="user-icon-address">联系地址</h3>
        </div>
        <div class="user-address-form-item-body">
          <div class="user-address-area" v-on:click="checkAddress">
            <div class="user-province">
              <mt-field placeholder="省份" v-model="address.province" readonly></mt-field>
              <label>省</label>
            </div>
            <div class="user-city">
              <mt-field placeholder="市" v-model="address.city" readonly></mt-field>
              <label>市</label>
            </div>
          </div>
          <mt-field placeholder="请填写详细地址，保证能正确收到娃娃" type="textarea" rows="2" v-model="address.street"></mt-field>
        </div>
      </div>
      <div class="user-address-form-item">
        <button v-if="ready" type="button" name="button" class="wawa-button-danger button-size-normal" v-on:click="save">
          <label> 保存 </label>
        </button>
        <button v-else type="button" name="button" class="wawa-button-danger button-size-normal disabled">
          <label> 保存 </label>
        </button>
      </div>
    </form>
    <!-- 底部弹出框选择地址 -->
    <mt-popup v-model="popupVisible" class="user-address-choose" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import store from 'store';
  import city from '../../../assets/common/city.json';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        ready: false,
        popupVisible: false,
        address: {
          addressId: '',
          userName: '',
          phone: '',
          province: '',
          city: '',
          street: '',
          isDefault: 0 // 非默认
        },
        slots: [{
            flex: 1,
            values: Object.keys(city),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          }
          /*, {
                divider: true,
                content: '-',
                className: 'slot4'
              }, {
                flex: 1,
                values: [],
                className: 'slot5',
                textAlign: 'center'
              }
          */
        ]
      }
    },
    watch: {
      address: {
        handler: function(a, b) {
          var that = this
          if (a.userName.replace(/(^\s*)|(\s*$)/g, "") != "" &&
            a.phone.replace(/(^\s*)|(\s*$)/g, "") != "" &&
            a.province.replace(/(^\s*)|(\s*$)/g, "") != "" &&
            a.city.replace(/(^\s*)|(\s*$)/g, "") != "" &&
            a.street.replace(/(^\s*)|(\s*$)/g, "") != "") {
            that.ready = true
          } else {
            that.ready = false
          }
        },
        deep: true
      }
    },
    destroyed() {
      store.remove('address')
    },
    mounted() {
      var that = this,
        id = this.$route.params.addressId || ''

      // 通过传入的id获取本地数据实体绑定表单
      if (id != '') {
        that.fetch()
      }
    },
    methods: {
      // 选择地址
      checkAddress: function() {
        this.popupVisible = true
      },
      onValuesChange(picker, values) {
        var that = this
        if (values[0] != undefined) {
          picker.setSlotValues(1, Object.keys(city[values[0]]))
        }

        /* 第三级
        if (values[1] != undefined) {
          picker.setSlotValues(2, city[values[0]][values[1]])
        }*/

        var v = picker.getValues()
        if (v.length > 1 && v[1] != undefined) {
          that.address.province = v[0]
          that.address.city = v[1]
        } else {
          picker.setSlotValues(0, Object.keys(city))
          picker.setSlotValue(0, that.address.province)
          picker.setSlotValue(1, that.address.city)
        }
      },

      // 获取数据
      fetch: function() {
        var that = this,
          address = store.get("address") || null

        if (!address) return

        // 逻辑：获取更新到本地的数据
        that.address.addressId = address.addressId
        that.address.userName = address.userName
        that.address.phone = address.phone
        that.address.province = address.province
        that.address.city = address.city
        that.address.street = address.street
        that.address.isDefault = address.isDefault
      },

      // 保存数据
      save: function() {
        var that = this,
          router = this.$router

        // 表单校验
        if (!that.checkForm()) return

        Indicator.open({
          text: '保存中...',
          spinnerType: 'snake'
        })
        // 逻辑：调用接口，成功后返回列表
        this.$ajax.post('user/address/save', {
          addressId: that.address.addressId,
          userName: that.address.userName,
          phone: that.address.phone,
          province: that.address.province,
          city: that.address.city,
          street: that.address.street,
          isDefault: that.address.isDefault
        }).then(res => {
          if (res && res.data) {
            Indicator.close()
            // 保存成功
            if (res.data.resBody.success == 1) {
              Toast({
                message: '保存成功',
                iconClass: 'icon icon-success',
                duration: 300
              });
              store.remove('address')
              setTimeout(function() {
                router.replace({
                  name: 'list'
                })
              }, 400)
            } else {
              // 保存失败
              Toast({
                message: '保存失败',
                iconClass: 'icon icon-success',
                duration: 400
              })
            }
          }
        })
      },

      // 校验表单
      checkForm: function() {
        var that = this,
          check = true

        if (that.address.phone.replace(/(^\s*)|(\s*$)/g, "") != "") {
          var re = /^1\d{10}$/
          if (!re.test(that.address.phone)) {
            Toast({
              message: '手机号码格式错误',
              position: 'bottom',
              duration: 800
            });
            check = false
          }
        }
        return check
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-address-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    .user-address-form-item {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      text-align: left;
      h2 {
        padding-left: 3.5rem;
        position: relative;
      }
      h2::before {
        content: "";
        position: absolute;
        background-image: url('~/static/images/user-icon-list.png');
        background-repeat: no-repeat;
        width: 2.4rem;
        height: 2.8rem;
        left: 4px;
        top: -4px;
        background-size: 26rem 10rem;
      }

      .user-icon-name::before {
        background-position: -0.6rem -3.2rem;
      }

      .user-icon-address::before {
        background-position: -4rem -3.2rem;
      }

      .user-icon-phone::before {
        background-position: -7rem -3.2rem;
      }

      .mint-cell:last-child {
        background-image: none !important;
      }

      .user-address-area {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;

        .user-province,
        .user-city {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        label {
          font-size: 1.4rem;
          width: 30px;
          line-height: 4rem;
          text-align: center;
        }
      }

      .user-address-area::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background: transparent;
      }
    }

    .user-address-form-item:last-child {
      text-align: center;
    }

    /** 弹出层 **/
    .mint-popup {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      border-radius: 0;
      font-weight: normal;
      padding: 0;
    }
  }
</style>
