<template>
  	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  		<h1 class="page-header">{{mode == 'add' ? 'Ajouter' : 'Modifier'}} une mixtape <button class="btn btn-primary pull-right" v-on:click="saveMixtape">Enregistrer</button><button class="btn btn-primary pull-right" v-on:click="cancel">Annuler</button></h1>
  		<form class="form-horizontal" v-on:submit.prevent>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">DJ(s)</label>
		    <div class="col-sm-10">
		      <input type="text" class="form-control" v-model="mixtape.artist" >
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">Titre</label>
		    <div class="col-sm-10">
		      <input type="text" class="form-control" v-model="mixtape.title">
		      <div class="alert alert-danger">Attention, le nom de l'artiste et le titre doivent correspondre exactement aux données présentes dans Airtime. Faîtes un copier-coller pour éviter toute erreur.</div>
		    </div>
		  </div>

	       <div class="form-group">
	          <label class="col-sm-2 control-label">Jacquette (jpg, png, bmp, gif)</label>
	          <div class="col-sm-10">
	            <input type="file" class="form-control" @change="selectMixtapeCover">
	          </div>
	        </div>

          <img :src="pictures_base_url + mixtape.cover" width="400px"/>
          <a v-on:click="removeImage">remove</a>

		  <div class="form-group">
		    <label class="col-sm-2 control-label">Année</label>
		    <div class="col-sm-10">
		      <input type="number" class="form-control" v-model="mixtape.year" >
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">Commentaires</label>
		    <div class="col-sm-10">
				<textarea class="form-control" rows="3" v-model="mixtape.comments"></textarea>
		    </div>
		  </div>
		  <div class="form-group">
		    <label class="col-sm-2 control-label">Tags</label>
		    <div class="col-sm-10">
		    	<input id="tag" type="text" class="form-control" v-model="tag">
		    	<typeahead v-model="tag" target="#tag" :data="tags"/>

		    	<button class="btn pull-right" v-on:click="addTag">Ajouter</button>
		    	<div>
		    		<span v-for="tag in mixtape.tags" class="label label-default">
		    			{{tag}} <a v-on:click="removeTag(tag)"><i class="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a> 
					</span>
				</div>
		    </div>
		    		    			    

		  </div>
		</form>
		<hr>
		<h3>Ajouter des pistes</h3>
		<hr>
		<div class="col-md-6">
			<h4>Une à une</h4>
			<div class="panel panel-default">
			  <div class="panel-body">
			    <form v-on:submit.prevent="addTrack">
					  <div class="form-group">
					    <label class="col-sm-4">Artiste</label>
					   	<div class="col-sm-8">
					    	<input type="text" class="form-control" v-model="track.artist">
					   	</div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4">Titre</label>
					    <div class="col-sm-8">
					    	<input type="text" class="form-control" v-model="track.title">
					    </div>
					  </div>
					  <div class="form-group">
					    <label class="col-sm-4">Commence à</label>
					    <div class="col-sm-8 form-inline">
						    <input type="number" class="col-md-4" v-model="track.start_hours" placeholder="heures">
						    <input type="number" class="col-md-4" v-model="track.start_minutes" placeholder="minutes"> 
						    <input type="number" class="col-md-4" v-model="track.start_seconds" placeholder="secondes">
						</div>    
					  </div>
					  <div class="form-group">
					  	<div class="col-sm-offset-4 col-sm-10">
					    	<button type="submit" class="btn btn-default" >Ajouter la piste</button>
					    </div>
			 			</div>
					</form>
			  </div>
			</div>	
			<h4>Ou à partir de la tracklist au format texte</h4>
			<div class="panel panel-default">
			  <div class="panel-body">
			    <form v-on:submit.prevent="parseTracks">
					  <div class="form-group">
							<textarea class="form-control" rows="10" v-model="mixtape.raw_tracks"></textarea>
					  </div>
					 	<div class="form-group">
							<button type="submit" class="btn btn-default" >Ajouter les pistes</button>
				  	</div>
					</form>
			  </div>
			</div>	
		</div>
		<div class="col-md-6">
		  <table class="table table-striped">
	        <thead>
	          <tr>
	          	<th>Début</th>
	            <th>Artiste</th>
	            <th>Titre</th>
	           	<th></th>
	          </tr>
	        </thead>
	        <tbody v-for="(track, index) in mixtape.tracks">
	          <tr>
	          	<td>{{track.start_hours}}:{{track.start_minutes}}:{{track.start_seconds}}</td>
	            <td>{{track.artist}}</td>
	            <td>{{track.title}}</td>
	            <td><a v-on:click="removeTrack(index)">remove</a></td>
	          </tr>
	        </tbody>
	      </table>
		</div>
	</div>

</template>

<script>
import mixtapes from '../data/mixtapes'
import router from '../router';
import {_} from 'vue-underscore';
import {Typeahead} from 'uiv'

export default {
  name: 'AddEditMixtape',
  components: {Typeahead},
  data () {
    return {
      mixtape : {...mixtapes.data.mixtape},
      track : {...mixtapes.data.track},
      tag : '',
      tags : mixtapes.tags,
      pictures_base_url: process.env.API_URL,
      mode : 'add'
    }
  },
  mounted () {
  	if(this.$route.params.id){
  		this.mode = 'edit';
  		var that = this;
  		mixtapes.get(this.$route.params.id,{success(r){that.mixtape = r;}});
  	} else {
  		this.mixtape.tracks = [];
  		this.pictures_base_url = '';
  	}
  },
  methods: {
  	addTrack: function(){
  		this.mixtape.tracks.push({...this.track});
  		this.track = {};
  	},
  	removeTrack: function(index){
  		this.mixtape.tracks.splice(index, 1);
  	},
  	addTag: function(){
  		if(this.mixtape.tags.includes(this.tag))
  			return;
  		this.mixtape.tags = this.mixtape.tags || [];
  		this.mixtape.tags.push(this.tag);
  		this.tag = '';
  	},
  	removeTag: function(tag){
  		this.mixtape.tags = _.without(this.mixtape.tags, tag);
  	},
  	parseTracks: function(){
			var regex = /\d+ (.*) : (.*)/g
			var matches = [];
			var match = regex.exec(this.mixtape.raw_tracks);
			while (match != null) {
			    this.mixtape.tracks.push({
			    	artist : match[1],
			    	title : match[2]
			    });
			    match = regex.exec(this.mixtape.raw_tracks);
			}
  	},
  	saveMixtape: function(){
  		if(this.mode == 'add'){
  			mixtapes.create(this.mixtape, {
	  			success(){
	  				confirm("Mixtape sauvegardée");
	  				mixtapes.getList();
			  		router.push('/mixtapes/list');
	  			},
	  			error(error){
	  				alert(error.response.data.message);
	  			}
	  		});
  		} else {
  			mixtapes.update(this.mixtape, {
	  			success(){
	  				confirm("Mixtape sauvegardée");
	  				mixtapes.getList();
			  		router.push('/mixtapes/list');
	  			},
	  			error(error){
	  				alert(error.response.data.message);
	  			}
	  		});
  		}
  		
  	},
  	cancel(){
  		if(confirm('Attention, les modifications seront perdues'))
  			router.push(this.mode == 'add' ? '/mixtapes/list' : '/mixtape/' + this.mixtape.id);
  	},
  	selectMixtapeCover(e) {
		var files = e.target.files || e.dataTransfer.files;
	    if (!files.length)
	      return;
	    this.createImage(files[0]);
	},
	createImage(file) {
		var image = new Image();
	    var reader = new FileReader();

	    this.pictures_base_url = '';

	    reader.onload = (e) => {
	      this.mixtape.cover = e.target.result;
	    };

	    reader.readAsDataURL(file);
	},
	removeImage(){
		this.mixtape.cover = null;
	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1 button{
		margin-left:10px;
	}
	span.label{
		margin-right : 5px;
	}
</style>
