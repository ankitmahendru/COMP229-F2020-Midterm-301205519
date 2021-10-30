/*<!--     Author- Ankit Mahendru       -->
<!--     StudentID-301205519     -->
<!--     MidTerm COMP229    -->*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { title } = require('process');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  
    /*****************
     * ADD CODE HERE *
     *****************/

  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Books',
        books: books
      });
    }
  });


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/

     var newBooks = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  book.create(newBooks, (err, newBooks) => {
      if (err) {
          console.log(err);
          res.end(err);
      } else {
          res.redirect('/books');
      }
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     var id = req.params.id;

     book.findById(id, (err, bookToUpdate) => {
      if (err) {
          console.log(err);
          res.end(err);
      } else {
          res.render('books/details', {
              title: "Update Contact",
              books: bookToUpdate,
          })
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
     var id = req.params.id;

     var updateBooks = {
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  }
     console.log(updateBooks)
     book.updateOne({_id : id}, updateBooks, (err)=>{
         if (err) {
             console.log(err);
             res.end(err);
         } else {
             res.redirect('/books');
         }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  var id = req.params.id;

  book.remove({_id : id}, (err)=>{
      if (err) {
          console.log(err);
          res.end(err);
      } else {
          res.redirect('/books');
      }
  });
});


module.exports = router;
