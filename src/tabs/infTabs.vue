<template>
    <div id="infTAb">
        <h4>
            Наименование:
            <span style="text-transform: capitalize;background: none;">
                {{title}}
            </span>
        </h4>
        <p>
            №:{{ids}}
        </p>
        <p>
            Описание продукта:{{text}}
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'app',
        props:['title','text','ids'],
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
            instance.get('/api/reviews/' + id, {})
            .then(response => {
                this.arr = response.data;
            })
            .catch(response => {
                console.log(response);
            })
        }
    }
</script>

