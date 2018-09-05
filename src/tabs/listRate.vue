<template>
    <div id="rate">
        <div v-for="onearr in arr" class="rate">
            <div class="userPhotoRAte" :style="{background:'rgb('+random(0,255)+
                ','+random(0,255)+','+random(0,255)+')'}">
                {{oneStr(onearr.created_by.username)}}
            </div>
            <div class="listInf">
                <div class="listInfUser">{{onearr.created_by.username}}</div>
                <p>{{onearr.text}}</p>
            </div>
            Оценка:
            <div class="goldRite" :style="{background:color(onearr.rate)}">
                {{onearr.rate}}
            </div>
        </div>
        <div v-if="ifs" style="text-align: center">Нету оценок</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'app',
        data () {
            return {
                arr:null
            }
        },
        created:function(){
            let id = this.$router.history.current.params.id;
            const instance = axios.create({
                baseURL: 'http://smktesting.herokuapp.com',
            });
            instance.get('/api/reviews/' + id, {
            })
                .then(response => {
                    this.arr = response.data.reverse();
                })
                .catch(response => {
                    console.log(response);
                })
        },
        methods: {
            oneStr:function(word){
                return word.substr(0,1).toUpperCase();
            },
            random:function(min,max){
                return Math.floor(Math.random()*(max-min+1))+min;
            },
            color:function(one){
                if (one < 4) {
                   return ' red';
                } else if (  one >= 4&&one < 8) {
                    return  'orange';
                } else if (one >= 8&&one <= 10) {
                    return  'green';
                }
            },
            ifs:function(){
                return arr.length == 0 ? false: true;
            }
        }

    }
</script>



