<!--
 * @Description: img test
 * @Author: J.
 * @Date: 2022-03-24 23:09:43
 * @LastEditors: J.
 * @LastEditTime: 2022-03-25 00:19:53
-->
<template>
  <div class="j-img">
    <template v-for="(item, index) in dataUrl">
      <img
        :key="'k' + index"
        :src="item.url"
        :alt="item.idx"
      >
    </template>
  </div>
</template>

<script>
export default {
  name: 'Img',
  data() {
    return {
      base: 'http://103.212.34.61/',
      dataUrl: []
    }
  },
  mounted() {
    this.repeat()
    // this.getRes()
  },
  methods: {
    repeat() {
      for (let i = 20000; i < 21000
      ; i++) {
        let base = this.base + i + '.jpg'
        this.dataUrl.push({url: base, idx: i})
      }
    },

    async getRes() {
      let res = await this.run(222, [])
      console.log(res, 444)
    },

    async run(number, arr) {
      
      const url = this.base + number + '.jpg'
      const realUrl = await this.CheckImgExists(url)
      console.log(realUrl, 111)
      if (realUrl) {
        arr.push(realUrl)
      }
      console.log(arr, 222)
      if (number > 1) {
        console.log(number, 333)

        await this.run(number - 1, arr)
      }
      return arr
    },

    CheckImgExists(imgurl) {
      return new Promise(function(resolve, reject) {
        var ImgObj = new Image() //判断图片是否存在
        ImgObj.src = imgurl
        ImgObj.onload = function(res) {
          // console.log(res, 111)
          resolve(imgurl)
        }
        ImgObj.onerror = function(err) {
          reject(err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.j-img {
  // background-color: aquamarine;
  padding: 16px;
  img {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 10px;
    border: 1px solid #ddd;
    box-sizing: border-box;
  }
}
</style>
