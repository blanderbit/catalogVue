<template>
    <div class="product">
        <myHeader></myHeader>
        <div class="h1">
            <a class="button pointer">Подать обьявление</a>
            <h1 style="text-align: center; font-style: italic">Каталог</h1>
        </div>
        <myList></myList>
        <myFooter></myFooter>
    </div>
</template>
<script>
    import axios from 'axios'
    import footer from './products/footer.vue'
    import header from './products/header.vue'
    import list from './products/listProduct.vue'
    export default{
        data(){
            return{}
        },
        components:{
            myFooter:footer,
            myHeader:header,
            myList:list
        }
    }
</script>
