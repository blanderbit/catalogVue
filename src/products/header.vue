<template>
    <header>
        <div class="upHeader">
           <div>
               <ul>
                   <li>
                       <a href="#">
                           ua
                       </a>
                   </li>
                   <li>
                       /
                   </li>
                   <li>
                       <a href="#" class="activeLang">
                           ru
                       </a>
                   </li>
               </ul>
               <ul>
                   <li v-if="!tokens?true:false">
                       <a href="#" @click.prevent="register" >
                           Зарегистрироваться
                       </a>
                   </li>
                   <li v-if="!tokens?true:false">|</li>
                   <li v-if="!tokens?true:false">
                       <a href="#" @click.prevent="sign" >
                           Вход
                       </a>
                   </li>
                   <li v-if="tokens?true:false">
                       <a href="#" @click.prevent="logout">
                           Выйти
                       </a>
                   </li>
               </ul>
           </div>
        </div>
        <div class="mainHead">
            <div class="headLeft">Express.UA</div>
            <div class="headCenter">
                <form class="search" >
                    <input type="search"  placeholder="Найти продукцию" class="input" />
                    <input type="submit"  value="" class="submit" />
                </form>
            </div>
            <div class="headRight">
                <div class="headRightMEnu">
                    <div class="headRightList pointer" @click="openListMenu">
                        <div :title="city">
                            {{city.length <= 10?city:simvols}}
                        </div>
                        <ion-icon name="arrow-dropdown" class="arrow"></ion-icon>
                    </div>
                    <div class="containerCity" style="z-index: 1200;" @mouseleave="leaved">
                        <div class="searchCity">
                            <input type="search" v-model="search"  placeholder="Найти город" class="input" />
                        </div>
                        <hr style="width:100%;height: 1px; background: gainsboro;margin-top: -3px">
                        <div class="city">
                            <div v-for="district in filterBy(districts,search)">
                                <h4>{{district.name}}</h4>
                                <div v-for="city in filterBy(district.city,search)"
                                     class="activeCity pointer" @click="changeCity(city.name)">
                                    {{city.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar">
            <navbar></navbar>
        </div>
    </header>
</template>
<style>
    .upHeader{
        border-bottom: 1px solid lightgrey;
        display: flex;
        justify-content: center;
    }
    .upHeader div{
        width: 900px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
    .upHeader ul{
        list-style: none;
        display: flex;
        padding: 0;
    }
    .upHeader ul:first-child li{
        margin: 0 2px
    }
    .upHeader ul:first-child a{
        color: gainsboro;
        text-decoration: none;
    }
    .upHeader ul:first-child a:hover{
        color: gray!important;
    }
    .activeLang{
        color: gray!important;
    }
    .upHeader ul:last-child li{
        margin: 0 2px
    }
    .upHeader ul:last-child a{
        color: rebeccapurple;
        text-decoration: none;
        transition: all 2ms;
    }
    .upHeader ul:last-child a:hover{
        font-weight: bold;
    }
</style>
<script>
    import nav from './nav.vue'
    import Vue from 'vue'
    import VueFilters from 'vue2-filters'
    Vue.use(VueFilters)
    export default {
        name: 'app',
        data () {
            return {
                city:'Киев',
                districts: district,
                simvols: '',
                search:'',
                tokens: token.validToken(),
            }
        },
        components:{
            navbar:nav
        },
        methods:{
            openListMenu:function() {
                let elem = document.querySelector('.containerCity');
                let ion = document.querySelector('.arrow');
                let style = window.getComputedStyle(elem).display;
                if(style == 'none'){
                    elem.style.display = 'block';
                    ion.style.transform = 'rotate(180deg)';
                }else{
                    elem.style.display = 'none';
                    ion.style.transform = 'rotate(0deg)';
                }
            },
            changeCity:function(name) {
                this.city = name;
                this.simvols = this.city.length <= 10?'':
                    this.city.substr(0,9).indexOf('-') <= 8?this.city.substr(0,7) + '...':this.city.substr(0,9);
            },
            leaved:function(){
                let elem = document.querySelector('.containerCity');
                elem.style.display = 'none';
            },
            register:function() {
                this.$router.push({name:'registration'});
            },
            sign:function() {
                this.$router.push({name:'login'});
            },
            logout:function() {
                let  ask = confirm("Вы точно хотите выйти?");
                if (ask == true) {
                    document.cookie = 'token=';
                    window.location.reload();
                }
            }
        },
    }
</script>
