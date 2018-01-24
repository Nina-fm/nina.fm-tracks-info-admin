<template>
  	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  		<div class="page-header">
		  <h1>{{mixtape.artist}} - {{mixtape.title}} <small>{{mixtape.year}}</small></h1>
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
import axios from 'axios'
import {_} from 'vue-underscore'

export default {
  name: 'Mixtape',
  data () {
    return {
      mixtape: {}
    }
  },
  mounted () {
    this.pictures_base_url = process.env.API_URL

    axios({method: 'GET', 'url': process.env.API_URL}).then(result => {
    	var id = this.$route.params.id
    	this.mixtape = _.find(result.data, function(m){return m.id == id;})
    	this.mixtape.text_tracks = this.mixtape.text_tracks.split('\n')
    }, error => {
        console.error(error);
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	img{
		height: 300px;
	}
</style>
