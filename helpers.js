const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports = {

postNewPoll: function(poll, response) {
    database('polls').insert({name: poll})
    .then(function() {
      database('polls').select()
        .then(function(polls) {
          response.status(200).json(polls)
        })
        .catch(function(error) {
          console.error('Sorry, could not post new poll to server.')
        });
    })
  },

  getPolls: function(response) {
    database('polls').select()
      .then(function(polls){
        response.status(200).json(polls)
      })
      .catch(function(error) {
        console.log('Sorry, no polls found.')
      })
  },
}
