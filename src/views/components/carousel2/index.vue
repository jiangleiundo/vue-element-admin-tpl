<!--
 * @Description: 轮播图
 * @Author: J.
 * @Date: 2022-04-16 17:28:03
 * @LastEditors: J.
 * @LastEditTime: 2022-04-17 17:17:36
-->

<template>
  <section>
    <div class="carousel-title" @mouseenter="mouseover" @mouseleave="mouseLeave">
      <ul>
        <li
          v-for="(tit, index) in btns"
          :key="index"
          :class="{'active':activeIndex === index}"
          @click="handleClick(index)"
        >
          <p><span class="title">{{ tit }}</span></p>
        </li>
      </ul>

      <div class="img-box">
        <!-- <el-button class="left" type="primary" icon="el-icon-d-arrow-left"></el-button>
          <el-button class="right" type="primary" icon="el-icon-d-arrow-right"></el-button> -->
        <b class="left" @click="handleLeft">&lt;</b>
        <b class="right" @click="handleRight">&gt;</b>

        <img :src="imgList[activeIndex]" alt="">
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      imgList: [
        'https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg',
        'https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg',
        'https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg',
        'https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg',
        'https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg',
        'https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg',
        'https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg',
        'https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg',
        'https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg',
        'https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg'
      ],
      btns: [
        '全面预算管理',
        '多维精益管理',
        '“1233”新型资金管理',
        '资本运营全过程管控',
        '国网商旅云',
        '智慧竣工决算',
        '智慧税务管理',
        '电e金融',
        '风控管理体系',
        '国网财务家园'
      ],
      activeIndex: 0,
      timer: null
    }
  },
  mounted() {
      this.initCarousel()
  },
  methods: {
      mouseover() {
          clearInterval(this.timer)
      },

      mouseLeave() {
          this.initCarousel()
      },

      initCarousel() {
          let len = this.imgList.length - 1
        this.timer = setInterval(() => {
            if (this.activeIndex === len) {
                this.activeIndex = 0
            } else {
                this.activeIndex++
            }
        }, 2000)
      },

    handleClick(idx) {
      this.activeIndex = idx
    },

    handleRight() {
        let len = this.imgList.length - 1
        if (this.activeIndex < len) {
            this.activeIndex++
        }
    },

    handleLeft() {
        if (this.activeIndex > 0) {
            this.activeIndex--
        }
    }

  }
}
</script>

<style lang="scss" scoped>
.carousel-title {
  max-width: 1200px;
  margin: 200px auto 0;

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul {
    max-width: 560px;
    margin: 0 auto;
  }
  li {
    border: 1px solid #ddd;
    padding: 0 3px;
    display: inline-block;
    margin: 6px;
    width: 100px;
    height: 64px;
    border-radius: 4px;
    cursor: pointer;

    > p {
      margin: 0;
      display: table;
      width: 100%;
      height: 100%;
      > span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        user-select: none;
        font-size: 14px;
      }
    }
  }
  li.active, li:hover {
    border-color: green;
    background-color: lightgreen;
  }

  .img-box {
    margin-top: 50px;
    height: 300px;
    border: 1px solid green;
    position: relative;

    img {
        width:100%;
        height: 100%;
    }
    > b {
      height: 40px;
      width: 20px;
      background-color: white;
      position: absolute;
      top: 50%;
      margin-top: -20px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
    .left {
      left: -10px;
    }
    .right {
      right: -10px;
    }
  }
}
</style>
