<template>
    <div class="product">
        <myHeader></myHeader>
        <div class="h1">
            <a class="button pointer">Подать обьявление</a>
            <h1 class="h1-title">{{title}} (№{{id}})</h1>
        </div>
        <hr class="hr">
        <div class="oneProducts" style="margin-bottom: 20px">
            <div class="productImg" :style="{background:'url('+photos(img)+')'}"></div>
            <div class="productInf">
                <ul>
                    <li :class="{active:number==0?true:false}" @click="tabs(0)">
                        Описание
                    </li>
                    <li :class="{active:number==1?true:false}" @click="tabs(1)">
                        Отзывы
                    </li>
                    <li :class="{active:number==2?true:false}" @click="tabs(2)">
                        Оставить отзыв
                    </li>
                </ul>
                <div>
                    <components :is="compon[number]" :title="title" :text="text" :ids="id"
                                v-on:numberBack="backs"></components>
                </div>
            </div>
        </div>
        <myFooter></myFooter>
    </div>
</template>
<script>
    import axios from 'axios'
    import footer from './products/footer.vue'
    import header from './products/header.vue'
    import listRate from './tabs/listRate.vue'
    import inf from './tabs/infTabs.vue'
    import addRate from './tabs/addRate.vue'
    import NProgress from 'nprogress'
    NProgress.configure({
        template:progress.np()
    });
    export default{
        data(){
            return{
                text: null,
                title: null,
                img:'https://thumbs.dreamstime.com' +
                '/b/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D1%81%D1%82%D1%8C-' +
                '%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D0%B5-%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-' +
                '%D0%B7%D0%BD%D0%B0%D0%BA%D0%B0-42217715.jpg',
                id:null,
                number:0,
                compon:['inf','listRate','addRate'],
                photoNon:'https://thumbs.dreamstime.com' +
                '/b/%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%B0%D1%8F-%D0%BA%D0%BE%D1%81%D1%82%D1%8C-' +
                '%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D0%B5-%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE-' +
                '%D0%B7%D0%BD%D0%B0%D0%BA%D0%B0-42217715.jpg'
            }
        },
        created:function(){
            NProgress.start()
            let id = this.$router.history.current.params.id;
            const instance = axios.create({
                baseURL: 'http://smktesting.herokuapp.com',
            });
            instance.get('/api/products/', {})
                .then(response => {
                    this.title = response.data[id - 1].title;
                    this.text = response.data[id - 1].text;
                    this.img = response.data[id - 1].img;
                    this.id = response.data[id - 1].id;
                    NProgress.done()
                })
                .catch(response => {
                    console.log(response);
                    this.$router.push({name:'products'});
                })
        },
        methods:{
            addRate:function(id){
                const instance = axios.create({
                    baseURL: 'http://smktesting.herokuapp.com',
                    headers:{
                        authorization:'Token ' + token.validToken()
                    }
                });
                instance.post('/api/reviews/'+ id, {
                    rate:null,
                    text:null
                })
                .then(response => {
                    console.log(response);
                })
                .catch(response => {
                    console.log(response);
                })
            },
            photos:function(img){
                if (img.indexOf('https://') == -1){
                    return this.photoNon;
                } else {
                    return img;
                }
            },
            tabs:function(numberOne){
                this.number = numberOne;
            },
            backs:function(val){
                this.number = val;
            }
        },
        components:{
            myFooter:footer,
            myHeader:header,
            listRate:listRate,
            inf:inf,
            addRate:addRate
        }
    }
</script>
<style>
   .h1-title {
       text-align: center;
       font-style: italic;
       text-transform: capitalize
   }
    .hr{
        width: 100%;
        height: 1px;
        background: rgb(224, 224, 224);border:none
    }
</style>
