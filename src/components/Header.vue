<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="mb-3">
    <b-navbar-brand href="#">Old Car Shop</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link 1</b-nav-item>
        <b-nav-item href="#">Link 2</b-nav-item>
        <b-nav-item href="#">Link 3</b-nav-item>
      </b-navbar-nav>
      <span class="ml-auto text-light" >{{ horas }}</span>
      <b-navbar-nav class="ml-auto">
        <b-input-group prepend="Pesquisa" class="ml-auto">
          <b-form-input placeholder="qual carro está procurando?"> </b-form-input>
          <b-input-group-append>
            <b-button variant="dark">Ok</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-navbar-nav>
    </b-collapse>
    <button type="button"
            class="btn-outline-info btn-lg ml-4"
            @click="mostrarTelaCarrinho()"
            >Carrinho: {{ listaCompras.length }}
      <b-icon icon="cart-check" variant="info"></b-icon>
    </button>
  </b-navbar>
</template>

<script>

export default {
  name: "Header",
  props:{
    listaCompras: Array
  },
  data(){
    return{
      horas: new Date().toLocaleDateString(),
      mostrarCarrinho:false
    }
  },
  methods:{
    mostrarTelaCarrinho(){
      this.mostrarCarrinho = !this.mostrarCarrinho;
      this.$emit('paraApp',this.mostrarCarrinho)
    }
  }
}
</script>

<style scoped>
::v-deep .nav-item {
  color: white !important;
}

.navbar-text{
  color: ghostwhite !important;
}
</style>