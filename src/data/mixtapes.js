import axios from "axios";
import {_} from 'vue-underscore';

export default (function(){

	var auth = {
		username: process.env.API_LOGIN,
		password: process.env.API_PASSWORD
	};

	var mixtapes = {
		data : {
			mixtapes: [],
			mixtape : {
				type: 'mixtape',
				cover: null,
				tracks: []
			},
			track: {}
		},
		getList(){
			axios({ 
				method: "GET", 
				"url": process.env.API_URL}).
			then(result => {
		    	mixtapes.data.mixtapes = _.filter(result.data, function(m){return m.type == 'mixtape';});
		    }, 
		    error => {
		        console.error(error);
		    });
		},
		addTrack(track){
			this.data.mixtape.tracks.push(track);
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
        	
        	axios({
			  method: 'post',
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
	}

	mixtapes.getList();

	return mixtapes;
})();