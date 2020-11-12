<template>
<div class="container">
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
        <star-rating v-bind:increment="0.1"
                     v-bind:max-rating="5"
                     v-bind:show-rating="false"
                     v-bind:rating="carro.avaliacao"
                     inactive-color="darkgray"
                     active-color="#c9c700"
                     v-bind:star-size="22"
                     :border-width="3"
                     :read-only="true"
        >
          <!--                vue-star-rating-->
        </star-rating>
        <!--              <span v-for="n in 5" :key="n"-->
        <!--                    v-bind:class="{ 'avaliacao-active': chevarAvaliacao(n,carro) }">-->
        <!--                <img src="./assets/estrela-vaz.jpg" alt="avaliação" height="20">-->
        <!--              </span>-->
      </div>
      <br>
      <b-button @click="adicionarAoCarrinho(carro)"
                v-if="validarPermissaoParaAdicionarNoCarrinho(carro)"
                class="btn btn-info">Comprar</b-button>
      <b-button v-else class="btn btn-danger disabled">Comprar</b-button>
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
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  name: "Main",
  data(){
    return{
      carros: [
        { id: "1HS21A", avaliacao: 4.2, estoqueDisponivel:6, carro: 'Firebird', descricao: 'O <strong>Firebird</strong> é um modelo desportivo compacto da Pontiac. É famoso principalmente por ter sido o modelo do carro K.I.T.T., personagem na série Knight Rider' , valor: 500000.99 , imagem: 'https://farm5.static.flickr.com/4617/24976568427_600b67de51_b.jpg'},
        { id: "2A14ART", avaliacao: 2.6, estoqueDisponivel:8, carro:'Cadillac Eldorado', descricao:'O <strong>Cadillac Eldorado</strong> é um automóvel coupé de porte grande da Cadillac, fabricado entre 1952 e 2002. A primeira geração durou somente um ano até surgir a segunda.',valor: 340000.34,imagem: 'https://farm5.static.flickr.com/4698/28067897479_6039b3014e_b.jpg'},
        { id: "3ER7AF", avaliacao: 5, estoqueDisponivel:3, carro:'GTO Pontiac', descricao:'Primeiro muscle car, o <strong>GTO</strong> fez da <strong>Pontiac</strong> um símbolo da esportividade de Detroit. ... Graças a uma equipe de apaixonados por carros, a marca só desabrocharia nos anos 60. Filho de um ex-presidente da GM, Semon “Bunkie” Knudsen havia assumido a divisão em 1956.',valor:430000.33,imagem: 'https://farm5.static.flickr.com/4611/28067896999_7c4b411760_b.jpg'},
        { id: "4RC432", avaliacao: 4.8, estoqueDisponivel:8, carro:'Chevrolet Task Force', descricao:'A série <strong>Task Force</strong>, mais conhecida como Chevrolet 3100 Marta Rocha sucedeu à série Advance Design, apelidada no Brasil de Chevrolet Boca de Sapo e Chevrolet Boca de Bagre. Introduzida no decorrer do ano de 1955, trazia um design mais moderno, seguindo a tendência do mercado americano.',valor: 280000.34,imagem: 'https://farm5.static.flickr.com/4751/25973969848_dee9622f0d_b.jpg'},
        { id: "5WA424", avaliacao: 3.7, estoqueDisponivel:7, carro:'Ford Model T', descricao:'O <strong>Ford Modelo T</strong> é um automóvel produzido pela fábrica norte-americana Ford, que popularizou e revolucionou a indústria automobilística. Vigésimo projeto da marca, foi fabricado por 19 anos, entre 1908 e 1927.',valor:720000.49,imagem: 'https://farm1.static.flickr.com/982/40181423420_c326955fc2_b.jpg'},
      ],
      carrinho:[]
    }
  },
  components:{
    StarRating
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
  },
  methods:{
    adicionarAoCarrinho:function (carro){
      this.carrinho.push(carro.id);
      this.$emit('paraApp',carro)
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
  }
}
</script>

<style scoped>
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
</style>