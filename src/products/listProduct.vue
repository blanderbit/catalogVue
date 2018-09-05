<template>
    <div id="product">
        <div class="product_content">
            <div class="oneProduct" v-for="arrOne in arr" @click="toOneProduct(arrOne.id)">
                <div class="photo" :style="{backgroundImage:'url('+photos(arrOne.img)+')'}"></div>
                <h4 style="text-transform: capitalize">
                    {{arrOne.title}}
                </h4>
                <div v-if="!error || error == ''?true:false">{{error}}</div>
                <p>
                    {{arrOne.text}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import NProgress from 'nprogress'
    NProgress.configure({
        template:progress.np()
    });
    export default {
        name: 'app',
        data () {
            return {
                arr:null,
                error:'',
                photoNon:'https://thumbs.dreamstime.com' +
                '/b/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D1%81%D1%82%D1%8C-' +
                '%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D0%B5-%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-' +
                '%D0%B7%D0%BD%D0%B0%D0%BA%D0%B0-42217715.jpg'
            }
        },
        created:function(){
            NProgress.start()
            const instance = axios.create({
                baseURL: 'http://smktesting.herokuapp.com',
                headers:{
                }
            });
            instance.get('/api/products/', {})
                .then(response => {
                    this.arr = response.data;
                    NProgress.done()
                })
                .catch(response => {
                   this.eroor = response.textStatus;
                    NProgress.done()
                })
        },
        methods:{
           photos:function(img){
               if (img.indexOf('https://') == -1) {
                   return this.photoNon;
               } else {
                   return img;
               }
           },
            toOneProduct:function(ids){
                this.$router.push({name:'oneProduct',params:{id:ids}});
            }
        }
    }
</script>
<style>
    .oneProduct:hover{
        transform: scale(1.05,1.05);
    }
</style>