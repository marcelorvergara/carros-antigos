<template>
  <div>
  <app-header v-bind:listaCompras="carros" @paraApp="mostraCarrinho"></app-header>
  <div class="container mt-3 bg-light">

    <b-container>
      <b-row>
        <b-col cols="5" class="ml-auto">
          <transition
              appear
              enter-active-class="animate__animated animate__bounce"
              leave-active-class="animate__animated animate__shakeY">
            <h5>{{ title }}</h5>
          </transition>
        </b-col>
        <b-col cols="2" class="ml-auto">

        </b-col>
      </b-row>
      <b-row>

      </b-row>
      <b-row>
        <HelloWorld msg="Olá! "/>
        <span v-if="horas < 12"> Bom dia!</span>
        <span v-if="horas >= 12 && horas < 18"> Boa tarde!</span>
        <span v-if="horas >= 18"> Boa noite</span>
        <span class="keep-spaces"> Já se passaram {{ segundos }} e você ainda não comprou seu carro!</span>
      </b-row>
      <b-row>

      </b-row>
    </b-container>
    <div>
      <div>
        <app-main v-if="!mostrarTelaCarrinho" @paraApp="atualizaCarrinho"></app-main>
        <app-carrinho v-else v-bind:listaCarros="carros"></app-carrinho>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HelloWorld from './components/HelloWorld.vue'
import Header from "@/components/Header";
import Main from "@/components/Main";
import Carrinho from "@/components/Carrinho";

export default {
  name: 'App',
  components: {
    HelloWorld,
    appHeader: Header,
    appMain: Main,
    appCarrinho: Carrinho
  },
  data(){
    return {
      mostrarTelaCarrinho:false,
      mostrarCarrinho:false,
      segundos: 0,
      title: "Concessionária de Carros Antigos",
      horas: new Date().getHours(),
      quantidadeNoCarrinho:0,
      carros:[]
    }
  },
  created() {
    setInterval(() => {
      this.segundos++;
    }, 1000)
  },
  methods:{
    atualizaCarrinho(value) {
      this.carros.push(value);
    },
    mostraCarrinho(values){
      this.mostrarTelaCarrinho = values;
    }
  }
}
</script>

<style>
span { white-space: pre-wrap; }

.row{
  justify-content: center;
}
.span.avaliacao-active{
  background-image: url('./assets/estrela-cheia.jpg');
  background-repeat: no-repeat;
  background-position-y: 3px;
  background-position-x: 1px;
  background-size: 20px;
}


</style>
