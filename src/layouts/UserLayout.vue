<template>
  <div id="userLayout" class="clearfix" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="loginBg"></div>
    <!-- <img src="@/assets/loginBg.png" alt="" class="loginBg"> -->
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/loginLogo.png" class="logo" alt="logo">
          </a>
        </div>
        <!-- <div class="desc">
          让网红运营变得简单有效
        </div> -->
      </div>

      <router-view />

      <div class="footer">
        <!-- <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div> -->
        <div class="copyright">
          Copyright &copy; 2020 无忧传媒
        </div>
        <div class="recordno">
          <a href="https://beian.miit.gov.cn" target="_blank">京ICP备2020035478号-1</a>
          <a target="_blank" style="margin-left:16px;" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502042412">
            <img style="margin-top:-4px" src="@/assets/icon_ba.png"/> 京公网安备 11010502042412号
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'

export default {
  name: 'UserLayout',
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      float: left;
      width: 60%;
      min-width: calc(100% - 580px);
      min-height: 100%;
      background-size: 100%;
      /* padding: 179px 0 144px; */
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      a {
        text-decoration: none;
      }

      .top {
        // text-align: center;
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
        .header {
          height: 44px;
          line-height: 44px;
          margin-top: -100px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 71px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: #565656;
          margin-top: 12px;
          margin-bottom: 40px;
          // text-indent: 20px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          margin-bottom: 5px;
        }
        .copyright,
        .recordno {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
  .loginBg{
    background: url(~@/assets/loginBg.png) no-repeat;
    background-size: cover;
    background-position: center;
    width: 40%;
    max-width: 580px;
    height: 100vh;
    float: left;
  }
  .clearfix{
    zoom: 1;
    &::before,
    &::after {
      display: table;
      content: ' ';
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }
</style>
