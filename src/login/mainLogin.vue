<template>
    <div class="modal">
        <div class="container">
            <div class="form">
                <form class="login-form">
                    <h3>Авторизация</h3>
                    <input type="text" v-model="name" placeholder="Логин"
                           :style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="password"v-model="password"
                           :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Пароль"/>

                    <button @click.prevent="signIn"
                           :style="{background:invalidButton==0?'rgb(0, 208, 255)':'red'}">Login</button>
                    <p class="message">
                        Не зарегистрированы?
                        <a href="#" @click.prevent="toRegistration">
                            Создать аккаунт
                        </a>
                    </p>
                </form>
            </div>
        </div>
        <div class="allErrors" :style="{opacity:allEroors==0?'0':'1'}">
            <ul>
                <li>
                    {{error1}}
                </li>
                <li>
                    {{error2}}
                </li>
                <li>
                    {{error0}}
                </li>
            </ul>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import axios from 'axios'
    import NProgress from 'nprogress'
    NProgress.configure({
        template:progress.np()
    });
    export default {
        data() {
            return {
                count:0,
                name: '',
                password:'',
                error0:'',
                error1:'',
                error2:'',
                allEroors:0,
                nameRequire:0,
                passwordRequire:0,
                invalidButton:0
            }
        },
        created:function(){
            NProgress.start()
            NProgress.done()
        },
        methods:{
            toRegistration:function(){
                this.$router.push({name:'registration'});
            },
            valids:function(valid,name,textEror){
                if (valid) {
                    this.count++;
                    name == 'login'?this.error1 = textEror:this.error2 = textEror;
                    name == 'login'?this.nameRequire = 1:this.passwordRequire = 1;

                } else {
                    name == 'login'?this.error1 = '':this.error2 = '';
                    this.count = 0;
                }
            },
            signIn:function() {
                this.valids(!this.name,'login',"Логин обязательный");
                this.valids(!this.password,'password',"Пароль обязательный");

                if (this.count == 0) {
                    const instance = axios.create({
                        baseURL: 'http://smktesting.herokuapp.com',
                    });
                    instance.post('/api/login/', {
                        username: this.name,
                        password: this.password
                    })
                    .then(response => {
                        if (response.data.success == false) {
                            this.allEroors = 1;
                            this.invalidButton = 1;
                            this.error0 = response.data.message;
                        } else {
                            let date =new Date(new Date().getTime() + 1200 * 1000);
                            document.cookie = 'token=' + response.data.token+'; expires=' + date.toUTCString();
                            this.$router.push({name:'products'});
                        }
                    })
                    .catch(response => {
                        console.log(response);
                        this.error0 = response.response;
                    })
                } else {
                    this.allEroors = 1;
                }

                let it = this;
                setTimeout(function () {
                    it.allEroors = 0;
                    it.nameRequire = 0;
                    it.passwordRequire = 0;
                    it.invalidButton = 0;
                },2000)
            },
        }
    }
</script>