<template>
<div class="container">
  <h4>Carrinho</h4>
  <div v-if="listaCarros.length">
    <h5 class="mt-4">Pedido:</h5>
    <b-table striped hover :items="pedidoFinal" >
    </b-table>
    <b-row align-h="end">
      <b-col cols="4" class="bg-info"><strong class="text-light">Total: {{ somaGeral() | formatarPreco('R$')}} </strong></b-col>
    </b-row>
  </div>
  <div class="row">
    <div class="col-12">
      <h5 class="mt-2">Dados para Entrega:</h5>
      <hr>
      <form>
        <div class="form-group">
          <label for="primeiroNome">Primeiro Nome:</label>
          <input type="text" class="form-control" id="primeiroNome"
                 placeholder="Digite o primeiro nome" v-model.trim="pedido.primeiroNome">
        </div>
        <div class="form-group">
          <label for="ultimoNome">Último Nome:</label>
          <input type="text" class="form-control" id="ultimoNome"
                 placeholder="Digite o último nome" v-model.trim="pedido.ultimoNome">
        </div>
        <div class="form-group">
          <label for="endereco">Endereço:</label>
          <input type="text" class="form-control" id="endereco"
                 placeholder="Digite o endereço" v-model.trim="pedido.endereco">
        </div>
        <div class="form-group">
          <label for="cidade">Cidade:</label>
          <input type="text" class="form-control" id="cidade"
                 placeholder="Digite sua cidade" v-model.trim="pedido.cidade">
        </div>
        <div class="form-group">
          <label for="estado">Estado</label>
          <select name="estado" id="estado" class="form-control"
                  v-model="pedido.estado">
            <option disabled value>Escolha um Estado</option>
            <option
                v-for="(estado,index) in estados" :value="estado" :key="index">
              {{ estado }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="cep">CEP</label>
          <input type="number" class="form-control" id="cep"
                 placeholder="Digite seu CEP" v-model.number="pedido.cep">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="pagoNaEntrega"
                 v-model="pedido.pagoNaEntrega"
                 :true-value="pedido.simNaEntrega"
                 :false-value="pedido.naoNaEntrega">
          <label for="pagoNaEntrega" class="form-check-label">Pagar na entrega?</label>
        </div>
        <div class="form-group form-check-inline">
          <input type="radio" class="form-check-input" id="manha"
                 value="Manhã" v-model="pedido.entrega">
          <label for="manha" class="form-check-label">Manhã</label>
        </div>
        <div class="form-group form-check-inline">
          <input type="radio" class="form-check-input" id="tarde"
                 value="Tarde" v-model="pedido.entrega">
          <label for="tarde" class="form-check-label">Tarde</label>
        </div>
        <div class="form-group form-check-inline">
          <input type="radio" class="form-check-input" id="noite"
                 value="Noite" v-model="pedido.entrega">
          <label for="noite" class="form-check-label">Noite</label>
        </div>

    <div class="col-12">
        <pre>
          Primeiro nome: {{ pedido.primeiroNome }}
          Último nome: {{ pedido.ultimoNome }}
          Endereço: {{ pedido.endereco }}
          Cidade: {{ pedido.cidade }}
          Estado: {{ pedido.estado }}
          CEP: {{ pedido.cep }}
          Pagar na entrega? {{ pedido.pagoNaEntrega }}
          Entrega: {{ pedido.entrega }}
        </pre>
    </div>
        <div class="form-group">
          <button class="btn btn-info btn-block" @click="submitFormulario">
            <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
            Finalizar Pedido
            <b-icon-exclamation-triangle></b-icon-exclamation-triangle>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Carrinho",
  props:{
    listaCarros:Array
  },
  methods:{
    submitFormulario(){
      confirm('Gostaria de finalizar o pedido?')
    },
    somaGeral(){
      var totValor = 0;
      for (let i=0; i < this.listaCarros.length; i++){
        totValor += (this.listaCarros[i].valor);
      }
      return totValor
    }
  },
  data(){
    return{
      fields:[
        {
          key: 'carro',
          sortable: true
        },
        {
          key: 'total',
          sortable: true
        }
      ],
      pedido:{
        primeiroNome:'',
        ultimoNome:'',
        endereco:'',
        cidade:'',
        estado:'',
        cep:'',
        pagoNaEntrega:'Não',
        simNaEntrega:'Sim',
        naoNaEntrega:'Não',
        entrega: 'Manhã'
      },
      estados:{
        RJ: 'Rio de Janeiro',
        MG: 'Minas Gerais',
        SP: 'São Paulo',
        ES: 'Espírito Santo'
      },
      carrinho: [],
      carro: {id: 0, avaliacao: 0, estoqueDisponivel:0, carro: '', descricao: '' , valor: 0 , imagem: ''},
      pedidoFinal:[],
      item: {
        id:Number,
        nome: String,
        valor: Number
      }
    }
  },
  filters:{
    capitalizar: function (valor){
      return valor.toUpperCase()
    }
  },
  created() {
    var tot1 = 0;
    var tot2 = 0;
    var tot3 = 0;
    var tot4 = 0;
    var tot5 = 0;

    var tot1q = 0;
    var tot2q = 0;
    var tot3q = 0;
    var tot4q = 0;
    var tot5q = 0;

    for (let i=0; i< this.listaCarros.length ; i++){
      switch (this.listaCarros[i].id){
        case 1:
            tot1q =+ tot1q+1;
            tot1 += this.listaCarros[i].valor;
            this.pedidoFinal[0] = {Carro:this.listaCarros[i].carro, Total: tot1, Quantidade: tot1q}
          break;

        case 2:
          tot2q =+ tot2q+1;
          tot2 += this.listaCarros[i].valor;
          this.pedidoFinal[1] = {Carro:this.listaCarros[i].carro, Total: tot2, Quantidade: tot2q}
          break;

        case 3:
          tot3q =+ tot3q+1;
          tot3 += this.listaCarros[i].valor;
          this.pedidoFinal[2] = {Carro:this.listaCarros[i].carro, Total: tot3, Quantidade: tot3q}
          break;

        case 4:
          tot4q =+ tot4q+1;
          tot4 += this.listaCarros[i].valor;
          this.pedidoFinal[3] = {Carro:this.listaCarros[i].carro, Total: tot4, Quantidade: tot4q}
          break;

        case 5:
          tot5q =+ tot5q +1;
          tot5 += this.listaCarros[i].valor;
          this.pedidoFinal[4] = {Carro:this.listaCarros[i].carro, Total: tot5, Quantidade: tot5q}
          break;
      }
    }
    this.pedidoFinal.sort((a,b) => (a.Carro > b.Carro) ? 1 : ((b.Carro > a.Carro) ? -1 : 0));
    console.log(this.pedidoFinal)
  }
}
</script>

<style scoped>

</style>