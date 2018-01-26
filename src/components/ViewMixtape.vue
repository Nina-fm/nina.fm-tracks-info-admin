<template>
  	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  		<div class="page-header">
		  <h1>{{mixtape.artist}} - {{mixtape.title}} <small>{{mixtape.year}}</small> <button class="btn btn-primary pull-right" v-on:click="editMixtape">Modifier</button></h1>
		  <div>
    		<span v-for="tag in mixtape.tags" class="label label-default">{{tag}}</span>
		  </div>
		</div>
	    <img v-bind:src="pictures_base_url + '/' + mixtape.cover">
	    <h4>Pistes</h4>
	    <div class="col-md-6 col-sm-12">
	    	<table class="table table-striped">
		        <thead>
		          <tr>
		            <th>Artiste</th>
		            <th>Titre</th>
		          </tr>
		        </thead>
		        <tbody v-for="track in mixtape.tracks">
		          <tr>
		            <td>{{track.artist}}</td>
		            <td>{{track.title}}</td>
		          </tr>
		        </tbody>
	      	</table>
	    </div>
	    <div class="col-md-6 col-sm-12">
	    	<table class="table table-striped">
		        <thead>
		          <tr>
		            <th>Titre brut</th>	          
		          </tr>
		        </thead>
		        <tbody v-for="track in mixtape.text_tracks">
		          <tr>
		            <td>{{track}}</td>
		          </tr>
		        </tbody>
	      	</table>
	    </div>
	</div>
</template>

<script>
import mixtapes from '../data/mixtapes'
import {_} from 'vue-underscore'
import router from '../router'

export default {
  name: 'Mixtape',
  data () {
    return {
      mixtape: {},
      pictures_base_url: process.env.API_URL
    }
  },
  mounted () {
  	var that = this;
  	mixtapes.get(this.$route.params.id, {
  		success : function(mixtape){
  			that.mixtape = mixtape;
  		}
  	});
  },
  methods : {
  	editMixtape(){
  		router.push('/mixtape/' + this.mixtape.id + '/edit');
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	img{
		height: 300px;
	}
	span.label{
		margin-right : 5px;
	}
</style>
