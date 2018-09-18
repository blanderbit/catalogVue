<template>
    <footer>
        <div class="footerTopColor">
            <div class="footerTop">
                <ul>
                    <h4>Покупателю</h4>
                    <li v-for="list in list1">
                        <a href="#">{{list}}</a>
                    </li>
                </ul>
                <ul>
                    <h4>Продавцу</h4>
                    <li v-for="list in list2">
                        <a href="#">{{list}}</a>
                    </li>
                </ul>
                <ul>
                    <h4>О нас</h4>
                    <li v-for="list in list3">
                        <a href="#">{{list}}</a>
                    </li>
                </ul>
                <ul class="lastUl">
                    <h4>Другие страны</h4>
                    <li v-for="list in list4">
                        <a href="#">{{list}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footerBottomColor">
            <div class="footerBottom">
                <div class="left">&#169 Express.UA</div>
                <div class="right" style="margin-right: 40px; position: relative">
                    <ion-icon name="logo-vk" class="pointer"></ion-icon>
                    <ion-icon name="logo-facebook" class="pointer"></ion-icon>
                    <ion-icon name="logo-instagram" class="pointer"></ion-icon>
                </div>
                <ion-icon name="arrow-round-up" class="arrowTop pointer" @click="toTop"></ion-icon>
            </div>
            <div class="clear"></div>
        </div>
    </footer>
</template>

<script>
    export default {
        data () {
            return {
                list1:['Kак покупать?','Оставить отзыв','Рекомендации','Программа прав потребителей','Правила'],
                list2:['Тарифы','Отзывы','Конфедициальность','Правила пользования','Требования'],
                list3:['О Express.UA','Наши отзывы','Реклама','Правила','Обьявления','Администрация'],
                list4:['Молдова','Беларусь','Польша','Казахстан']
            }
        },
        methods:{
            toTop:function(){
                window.scrollTo(0,0);
            }
        }
    }
</script>