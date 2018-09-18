<template>
    <div class="product">
        <myHeader v-on:overflow="scroll($event)" ></myHeader>
        <div class="h1">
            <a class="button pointer" @click.prevent="open">Подать обьявление</a>
            <h1 style="text-align: center; font-style: italic">Каталог</h1>
        </div>
        <myList></myList>
        <myFooter></myFooter>
        <modal v-on:close="none($event)" :style="{display:inf}"></modal>
    </div>
</template>
<style>
    .modal{
        position: absolute;top:0;
    }
</style>
<script>
    import axios from 'axios'
    import footer from './products/footer.vue'
    import header from './products/header.vue'
    import list from './products/listProduct.vue'
    import modal from './modal/addProduct.vue'


    export default{
        data(){
            return{
                inf:'none',
            }
        },
        created:function(){
            window.scrollTo(0,0);
        },
        components:{
            myFooter:footer,
            myHeader:header,
            myList:list,
            modal:modal
        },
        methods:{
            open:function(){
                this.inf = 'flex'
                let body = document.body
                body.style.overflowY = 'hidden'
            },
            none:function(value){
                this.inf = value
            },
            scroll:function(value){
                console.log(value)
                this.scrolls = value
            }
        }
    }
</script>
