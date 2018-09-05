<template>
    <nav>
        <ion-icon name="menu" class="menu" @click="open"></ion-icon>
        <div>
            <ul>
            <li v-for="arrOne in arr">
                <a href="#">
                    {{arrOne}}
                </a>
            </li>
            <li v-if="!tokens?true:false">
                <a href="#" @click.prevent="register" >
                    Зарегистрироваться
                </a>
            </li>
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
            <div class="clear"></div></ul>
        </div>
    </nav>
</template>

<script>
    export default {
        data () {
            return {
                tokens: token.validToken(),
                arr:['Главная','Каталог','Услуги','Товары для бизнеса']
            }
        },
        methods:{
            open:function() {
                let elem = event.target.nextElementSibling;
                let target = event.target;
                let style = getComputedStyle(elem).display;
                if(style == 'none'){
                    elem.style.display = 'block';
                    target.style.transform = 'rotate(90deg)';
                }else{
                    elem.style.display = 'none';
                    target.style.transform = 'rotate(0deg)';
                }
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
        }
    }
</script>
