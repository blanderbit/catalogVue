<template>
    <div class="modal">
        <div class="container">
            <div class="form">
                <form class="login-form">
                    <h3>Регистрация</h3>
                    <input type="text" v-model="name" placeholder="Логин"
                           :style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="password"v-model="password"
                           :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Пароль"/>
                    <button @click.prevent="create"
                        :style="{background:invalidButton==0?'rgb(0, 208, 255)':invalidButton > 1?'blue':'red'}">
                        Создать
                    </button>
                    <p class="message">
                        У вас есть аккаунт?
                        <a href="#" @click.prevent="toLogin">
                            Войти
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
<script>
    import axios from 'axios'
    import NProgress from 'nprogress'
    NProgress.configure({
        template:progress.np()
    });
    export default{
        data(){
            return{
                count:0,
                name: '',
                password:'',
                error0:'',
                error1:'',
                error2:'',
                allEroors:0,
                nameRequire:0,
                passwordRequire:0,
                invalidButton:0,
            }
        },
        created:function(){
            NProgress.start()
            NProgress.done()
        },
        methods:{
            toLogin:function(){
                this.$router.push({name:'login'});
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
            create:function(){
                this.valids(!this.name,'login',"Логин обязательный");
                this.valids(!this.password,'password',"Пароль обязательный");

                if(this.count == 0) {
                    NProgress.start()
                    const instance = axios.create({
                        baseURL: 'http://smktesting.herokuapp.com',
                    });
                    instance.post('/api/register/', {
                        username: this.name,
                        password: this.password
                    })
                    .then(response => {
                        if(response.data.success == false){
                            NProgress.done()
                            this.allEroors = 1;
                            this.invalidButton = 1;
                            this.error0 = response.data.message;
                        }
                        else{
                            this.error0 = response.statusText;
                            this.invalidButton = 2;
                            let router = this;
                            setTimeout(function () {
                                router.$router.push({name:'login'});
                                NProgress.done()
                            },2000)
                        }
                    })
                    .catch(response => {
                        this.error0 = response.response;
                    })
                }else{
                    this.allEroors = 1;
                }
                let it = this;
                setTimeout(function () {
                    it.allEroors = 0;
                    it.nameRequire = 0;
                    it.passwordRequire = 0;
                    it.invalidButton = 0;
                },2000)
            }
        },

    }
</script>
