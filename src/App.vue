<template>
  <div class="container mt-3 bg-light">
    <b-container>
      <b-row>
        <b-col cols="5" class="ml-auto">
          <transition
              appear
              enter-active-class="animate__animated animate__bounce"
              leave-active-class="animate__animated animate__shakeY">
            <h2>{{ title }}</h2>
          </transition>
        </b-col>
        <b-col cols="2" class="ml-auto">
          <button type="button" class="btn-outline-primary btn-lg"
            @click="mostrarCarrinho">
            Carrinho: {{ quantidadeNoCarrinho }} carros
          </button>
        </b-col>
      </b-row>
      <b-row>

      </b-row>
      <b-row>

        <HelloWorld msg="Olá! "/>
        <h5>Já se passaram {{ segundos }} e você ainda não comprou seu carro!</h5>
      </b-row>
      <b-row>
      <p v-if="horas < 12">Bom dia!</p>
      <p v-if="horas >= 12 && horas < 18">Boa tarde!</p>
      <p v-if="horas >= 18">Boa noite!</p>
      </b-row>
    </b-container>

    <div>
      <div v-if="mostrarCarros">
        <b-card-group deck>

          <b-card v-for="(carro, index) in carrosOrdenados" :key="index"
              :title='carro.carro'
              :img-src='carro.imagem'
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
          >
            <b-card-text>
              <p class="card-text" v-html="carro.descricao"></p>
              <p class="mt-2">
                <span class="border-left border-bottom border-right-0 font-italic">{{ carro.valor | formatarPreco("R$") }}</span>
              </p>
            </b-card-text>
            <div class="avaliacao">
              <star-rating v-bind:increment="0.5"
                           v-bind:max-rating="5"
                           v-bind:show-rating="false"
                           v-bind:rating="carro.avaliacao"
                           inactive-color="black"
                           active-color="#c7c700"
                           v-bind:star-size="25"
                            >
<!--                vue-star-rating-->
              </star-rating>
<!--              <span v-for="n in 5" :key="n"-->
<!--                    v-bind:class="{ 'avaliacao-active': chevarAvaliacao(n,carro) }">-->
<!--                <img src="./assets/estrela-vaz.jpg" alt="avaliação" height="20">-->
<!--              </span>-->
            </div>
            <br>
            <b-button>
              <a href="#" @click="adicionarAoCarrinho(carro)"
                      v-if="validarPermissaoParaAdicionarNoCarrinho(carro)"
                      class="btn btn-outline-light">Comprar</a>
              <a href="#" v-else class="btn btn-outline-light disabled">Comprar</a>
            </b-button>
            <br><br>
            <span class="mensagem-estoque" v-if="carro.estoqueDisponivel - quantidadeNoCarringoPorCarro(carro) === 0">
              Indisponível!
            </span>
            <span class="mensagem-estoque-y" v-else-if="carro.estoqueDisponivel - quantidadeNoCarringoPorCarro(carro) < 4">
              Atenção! Apenas {{ carro.estoqueDisponivel - quantidadeNoCarringoPorCarro(carro) }} carro(s) no estoque!!!
            </span>
            <span class="mensagem-estoque-g" v-else>
              Compre Agora
            </span>
          </b-card>
        </b-card-group>
      </div>
    <div class="row" v-else>
      <h4>Carrinho</h4>
      <div class="col-12">
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
          <div class="form-group">
            <button class="btn btn-outline-success" @click="submitFormulario">
              Finalizar Pedido
            </button>
          </div>
        </form>
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
    </div>
    </div>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HelloWorld from './components/HelloWorld.vue'
import StarRating from 'vue-star-rating'
export default {
  name: 'App',
  components: {
    HelloWorld,
    StarRating
  },
  data(){
    return {
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
      mostrarCarros: true,
      segundos: 0,
      title: "Concessionária de Carros Antigos",
      horas: new Date().getHours(),
      estados:{
        RJ: 'Rio de Janeiro',
        MG: 'Minas Gerais',
        SP: 'São Paulo',
        ES: 'Espírito Santo'
      },
      carros: [
        { id: 1, avaliacao: 3, estoqueDisponivel:6, carro: 'Firebird', descricao: 'O <strong>Firebird</strong> é um modelo desportivo compacto da Pontiac. É famoso principalmente por ter sido o modelo do carro K.I.T.T., personagem na série Knight Rider' , valor: 500000.99 , imagem: 'https://farm5.static.flickr.com/4617/24976568427_600b67de51_b.jpg'},
        { id: 2, avaliacao: 3, estoqueDisponivel:8, carro:'Cadillac Eldorado', descricao:'O <strong>Cadillac Eldorado</strong> é um automóvel coupé de porte grande da Cadillac, fabricado entre 1952 e 2002. A primeira geração durou somente um ano até surgir a segunda.',valor: 340000.34,imagem: 'https://farm5.static.flickr.com/4698/28067897479_6039b3014e_b.jpg'},
        { id: 3, avaliacao: 3, estoqueDisponivel:3, carro:'GTO Pontiac', descricao:'Primeiro muscle car, o <strong>GTO</strong> fez da <strong>Pontiac</strong> um símbolo da esportividade de Detroit. ... Graças a uma equipe de apaixonados por carros, a marca só desabrocharia nos anos 60. Filho de um ex-presidente da GM, Semon “Bunkie” Knudsen havia assumido a divisão em 1956.',valor:430000.33,imagem: 'https://farm5.static.flickr.com/4611/28067896999_7c4b411760_b.jpg'},
        { id: 4, avaliacao: 3, estoqueDisponivel:8, carro:'Chevrolet Task Force', descricao:'A série <strong>Task Force</strong>, mais conhecida como Chevrolet 3100 Marta Rocha sucedeu à série Advance Design, apelidada no Brasil de Chevrolet Boca de Sapo e Chevrolet Boca de Bagre. Introduzida no decorrer do ano de 1955, trazia um design mais moderno, seguindo a tendência do mercado americano.',valor: 280000.34,imagem: 'https://farm5.static.flickr.com/4751/25973969848_dee9622f0d_b.jpg'},
        { id: 5, avaliacao: 3, estoqueDisponivel:7, carro:'Ford Model T', descricao:'O <strong>Ford Modelo T</strong> é um automóvel produzido pela fábrica norte-americana Ford, que popularizou e revolucionou a indústria automobilística. Vigésimo projeto da marca, foi fabricado por 19 anos, entre 1908 e 1927.',valor:720000.49,imagem: 'https://farm1.static.flickr.com/982/40181423420_c326955fc2_b.jpg'},
      ],
      carrinho: []
    }
  },
  filters:{
    capitalizar: function (valor){
      return valor.toUpperCase()
    }
  },
  created() {
    setInterval(() => {
      this.segundos++;
    }, 1000)
  },
  methods:{
    getRating: function(){
      this.rating= this.carro.avaliacao;
    },
    chevarAvaliacao(n,carro){
      return carro.avaliacao - n >= 0;
    },
    submitFormulario(){
      confirm('Gostaria de finalizar o pedido?')
    },
    mostrarCarrinho(){
      this.mostrarCarros = !this.mostrarCarros;
    },
    adicionarAoCarrinho:function (carro){
      this.carrinho.push(carro.id);
    },
    quantidadeNoCarringoPorCarro:function (carro){
      var quantidade = 0;
      for (let i=0; i<this.carrinho.length;i++){
        if (carro.id === this.carrinho[i]){
          quantidade++;
        }
      }
      return quantidade;
    },
    validarPermissaoParaAdicionarNoCarrinho: function (carro){
      return carro.estoqueDisponivel > this.quantidadeNoCarringoPorCarro(carro);
    }
  },
  computed:{
    // eslint-disable-next-line vue/return-in-computed-property
    carrosOrdenados(){
      if (this.carros.length > 0){
        // eslint-disable-next-line no-inner-declarations
        function compare(a,b){
          if (a.carro.toLowerCase() < b.carro.toLowerCase())
            return -1;
          if (a.carro.toLowerCase() > b.carro.toLowerCase())
            return 1
          return 0
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.carros.sort(compare);
      }
    },
    quantidadeNoCarrinho:function (){
      return this.carrinho.length;
    }
  }
}
</script>

<style>
.mensagem-estoque{
  font-weight: bold;
  color: red;
}
.mensagem-estoque-y{
  font-weight: bold;
  color: #c7c700;
}
.mensagem-estoque-g{
  font-weight: bold;
  color: #44ff00;
}
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
