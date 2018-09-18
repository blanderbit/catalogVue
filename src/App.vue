<template>
  <div id="app" @resize="hendleResize($event)">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
  },
  created:function(){
      this.$router.push({name:'products'})
  },
  methods: {
      hendleResize: function () {
          let oneNavDiv = document.querySelector('nav > div')
          let menu = document.querySelector('.menu')
          menu.style.transform = 'rotate(0deg)'
          if(window.innerWidth > 724){
              oneNavDiv.style.display = 'block'
          }else{
              oneNavDiv.style.display = 'none'
          }
      },
  },
  mounted(){
      window.addEventListener('resize', this.hendleResize)
      this.hendleResize()
  }
}
</script>

<style>
  body {
    background:white;
    font-family: "Roboto", sans-serif;
    margin:0;
    padding: 0;
    overflow-x: hidden;
  }
</style>
