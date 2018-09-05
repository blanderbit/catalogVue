<template>
    <div id="addRate">
        <div class="form" style="box-shadow: none;margin-top: 100px">
            <form class="login-form">
                <h3 style="margin-top: -20px">
                    Оставить оценку
                </h3>
                <div  v-if="!tokens?false:true">
                    <input type="text" v-model="texts" placeholder="Текст"
                           :style="{border:text==''||!text?'1px solid red':'1px solid white'}"/><br>
                    <div>
                        {{rate}}
                    </div>
                    <input type="range" v-model="rate" min="0" max="10" value="5">
                    <button @click.prevent="addRate">
                        Оставить оценку
                    </button>
                </div>
                <div v-else="">
                    Оставить оценку может только авторизированый пользователь!
                    <a href="#" @click.prevent="sign">
                        Войти
                    </a> |
                    <a href="#" @click.prevent="register">
                        Зарегистрироваться
                    </a>
                </div>
            </form>
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
        props:['title','text','ids'],
        data () {
            return {
                arr:null,
                rate:'5',
                texts:'',
                textRequire:'',
                tokens: token.validToken()
            }
        },
        methods: {
            addRate:function() {
                NProgress.start()
                let id = this.$router.history.current.params.id;
                const instance = axios.create({
                    baseURL: 'http://smktesting.herokuapp.com',
                    headers: {
                        authorization: 'Token ' + token.validToken()
                    }
                });
                instance.post('/api/reviews/' + id, {
                    rate: this.rate,
                    text: this.texts,
                    email: 'yarik@gmail.com'
                })
                    .then(response => {
                        this.$emit('numberBack',1);
                        NProgress.done()
                    })
                    .catch(response => {
                        console.log(response);
                        NProgress.done()
                    })
            },
            register:function(){
                this.$router.push({name:'registration'});
            },
            sign:function(){
                this.$router.push({name:'login'});
            },
        }

    }
</script>
