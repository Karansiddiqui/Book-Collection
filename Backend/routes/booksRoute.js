import express from 'express';
import { Book } from '../models/bookModel.js'

const router = express.Router();
router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  //Route to get one book by id
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(200).json({
        count: book.length,
        data: book,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  // Route to add one book
  router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(234).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  // Route to update one book
  
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        res.status(234).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
      if (!result) {
          return res.status(404).send({ message: "Book not found" });
      }
      return res.status(200).send({message: 'Book updated successfully'});
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });
  
  //Route to delete a book
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
          return res.status(404).send({ message: "Book not found" });
      }
      return res.status(200).send({message: 'Book deleted successfully'});
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  });

  export default router;