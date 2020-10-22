import Vue from 'vue';

Vue.filter('formatarPreco', function (preco,simbolo){
    if (!parseInt(preco)){
        return "";
    }
    var precoFormatado = (preco).toLocaleString('pt-BR');
    return simbolo + " " + precoFormatado;
})