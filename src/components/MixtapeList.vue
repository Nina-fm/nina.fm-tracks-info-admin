<template>
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <h1 class="page-header">Mixtapes <router-link to="/mixtape/add" tag="button" class="btn btn-primary pull-right">Ajouter une mixtape</router-link></h1>
    <p>
      <span v-for="tag in tags" class="label label-default"><a v-on:click='addTagFilter(tag)'>{{tag}}</a></span>
    </p>
        Filtres : 
          <span v-for="tag in filters.tags" class="label label-default"><a v-on:click='removeTagFilter(tag)'>{{tag}}</a></span>
    </p>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>DJ</th>
            <th>Titre</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="mixtape in mixtapes">
          <router-link :to=" '/mixtape/' + mixtape.id " tag="tr">
            <td>{{mixtape.artist}}</td>
            <td>{{mixtape.title}}</td>
            <td><button class="btn pull-right" v-on:click.prevent="deleteMixtape(mixtape.id)">Supprimer</button></td>
          </router-link>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import mixtapes from '../data/mixtapes'

export default (function(){

  return {
    name: 'MixtapeList',
    data () {
      return mixtapes.data;
    },
    methods : {
      addTagFilter : function(tag){
        mixtapes.filter({tag : tag});
      },
      removeTagFilter : function(tag){
        mixtapes.unfilter({tag : tag});
      },
      deleteMixtape : function(mixtape_id){
        if(confirm('Etes-vous sûr de vouloir supprimer cette mixtape? L\'action est irréversible.')){
          mixtapes.delete(mixtape_id, {
            error(){
              alert('impossible de supprimer la mixtape')
            }
          })
        }
      }
    }
  }
})()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  td img{
    height: 50px;
  }
  span.label{
    margin-right : 5px;
  }

/*h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/
</style>
