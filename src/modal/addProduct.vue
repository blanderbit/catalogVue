<template>
    <div class="modal" @click.prevent.stop="close">
        <div class="container" >
            <div class="form">
                <form class="login-form">
                    <h3>Обьявление</h3>
                    <input type="text" v-model="name" placeholder="заголовок"
                           :style="{border:nameRequire==0?'1px solid white':'1px solid red'}"/><br>
                    <input type="text" v-model="text" placeholder="Описание"><br>
                    <input type="text" v-model="link"
                           :style="{border:passwordRequire==0?'1px solid white':'1px solid red'}" placeholder="Ссылка на фото"/>
                    <button @click.prevent="create"
                        :style="{background:invalidButton==0?'rgb(0, 208, 255)':invalidButton > 1?'blue':'red'}">
                        Создать
                    </button>
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
                text:'',
                link:'',
                error0:'',
                error1:'',
                error2:'',
                allEroors:0,
                nameRequire:0,
                passwordRequire:0,
                invalidButton:0,
                tokens: token.validToken()
            }
        },

        methods:{
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
            close:function(){
            let modal = event.target.classList.contains('modal')
                if(modal == true){
                    this.$emit('close','none')

                }
                let body = document.body
                body.style.overflowY = 'scroll'
            },
            create:function(){
                this.valids(!this.name,'login',"Заголовок обязательный");
                this.valids(!this.link,'password',"Ссылка обязательный");

                if(this.count == 0) {
                    NProgress.start()
                    const instance = axios.create({
                        baseURL: 'http://smktesting.herokuapp.com',
                        headers:{
                            authorization: 'Token ' + token.validToken()
                        }
                    });
                    instance.post('/api/products/', {
                        title: this.name,
                        text:this.text,
                        img:this.link,
                    })
                    .then(response => {
                        console.log(response)
                        this.$emit('close','none')
                        let body = document.body
                         body.style.overflowY = 'scroll'
                        window.location.reload()
                    })
                    .catch(response => {
                       this.eroor = response.textStatus;
                        NProgress.done()
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
