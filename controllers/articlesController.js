const db = require("../models");
const axios = require("axios")

// Defining methods for the articlesController
module.exports = {
  findAll: function (req, res) {

    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json')
      .then(result => {
        //console.log(result)
        var emptyArray = [];
        //loop here
        for (i = 0; i < result.data.length; i++) {
          //in loop fill data for single entry
          var obj = {
            title: result.data[i].title,
            date: result.data[i].date,
            link: result.data[i].link,
          }
          console.log(obj)
          //push entry to empty array
          emptyArray.push(obj)  
        }
        db.Article.create(emptyArray).then(resl => { res.json(resl) })
      })

      .catch(err => {
        console.log(err)
        res.end()
      });
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
