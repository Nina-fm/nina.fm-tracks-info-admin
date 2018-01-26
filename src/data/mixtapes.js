import axios from "axios";
import {_} from 'vue-underscore';

export default (function(){

	var auth = {
		username: process.env.API_LOGIN,
		password: process.env.API_PASSWORD
	};

	var mixtape_list = [];

	function saveMixtape(http_method, mixtape, callbacks){
    	axios({
		  method: http_method,
		  url: process.env.API_URL,
		  data: mixtape,
		  params: auth
		})
		  .then(function(){
          	if(callbacks.success) callbacks.success();
		  })
		  .catch(function (error) {
        	if(callbacks.error) callbacks.error(error);
		  }); 
	}

	var mixtapes = {
		data : {
			mixtapes: [],
			tags : [],
			filters : {
				tags : []
			},
			mixtape : {
				type: 'mixtape',
				cover: null,
				tracks: [],
				tags : []
			},
			track: {}
		},
		get(id, callbacks){
			axios({
				method: 'GET', 
				'url': process.env.API_URL}).
			then(function(result){
              	if(callbacks.success){
              		var m = _.find(result.data, function(m){return m.id == id;});

              		if(m.text_tracks){
              			m.text_tracks = m.text_tracks.split('\n');
              		}

              		if(!m.tags){
              			m.tags = [];
              		}

              		callbacks.success(m);	
              	};
			})
			.catch(function (error) {
            	if(callbacks.error) callbacks.error(error);
			});
		},
		filter(filter){

			if(filter){
				if(!_.contains(this.data.filters.tags, filter.tag))
					this.data.filters.tags.push(filter.tag);
			}

			this.data.mixtapes = mixtape_list;

			_.each(this.data.filters.tags, function(t){

				mixtapes.data.mixtapes = _.filter(mixtapes.data.mixtapes, function(m){
					return _.contains(m.tags, t);
				});
			});

		},
		unfilter(filter){
			this.data.mixtapes = mixtape_list;
			this.data.filters.tags = _.without(mixtapes.data.filters.tags, filter.tag);
			this.filter();
		},
		getList(){
			axios({ 
				method: "GET", 
				"url": process.env.API_URL}).
			then(result => {
				mixtape_list = _.filter(result.data, function(m){return m.type == 'mixtape';});
				mixtapes.data.tags = _.unique(_.compact(_.flatten(_.pluck(mixtape_list, 'tags'))));
				this.filter();
		    }, 
		    error => {
		        console.error(error);
		    });
		},
		delete(mixtape_id, callbacks){
			axios.delete(
				process.env.API_URL, 
				{ 
					params: {
						id: mixtape_id,
						username: auth.username,
						password: auth.password
					}
				})
            .then(function(response){
              mixtapes.getList();
              if(callbacks.success) callbacks.success();
            })
            .catch(function(error){
            	if(callbacks.error) callbacks.error(error);
            });
        },
        create(mixtape, callbacks){
        	saveMixtape('post', mixtape, callbacks);
        },
        update(mixtape, callbacks){
        	saveMixtape('put', mixtape, callbacks);
        }
	}

	mixtapes.getList();

	return mixtapes;
})();