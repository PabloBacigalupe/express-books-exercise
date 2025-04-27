const express = require("express");
const app = express(); // crear el servidor
const port = 3000; 

//Importo los libros
const books = require("./data/books.json");


// LISTENER -- Mi app va a estar escuchand en el puerto 3000
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});
  


// GET http://localhost:3000/
app.get("/", (req, res) => {
    res.send("Hello World!");
  });


//Devuelve todos los libros
// GET http://localhost:3000/data/books
  app.get("/data/books/:title?", (req, res) => {
    // las {} indican opicionalidad
  //   console.log(req);
    const title = req.params.title; 
  //   console.log(title);
  //   console.log(req.params);
  
    // buscar por título
    if (title) {
      const book = books.find((book) => book.title === title); // buscar libro por título
      if (book) { // si el libro existe
        res.status(200).json(book); // devuelve el libro con el título Harry Potter
      } else { // si el libro no existe
        res.status(404).json({msj: "Libro no encontrado"}); // devuelve un mensaje de error
      }
    } else { // devolver todos los libros
      res.status(200).json(books); // devuelve todos los libros
    }
  });


  //Devuelve el primer libro
  // GET http://localhost:3000/first
app.get("/first", (req, res) => {
    const firstBook = books[0]; // el primer libro es el de índice 0
    res.status(200).json(firstBook);
  });

  //Devuelve el último libro
  // GET http://localhost:3000/last
  app.get("/last", (req, res) => {
    const lastBook = books[books.length - 1]; // el ultimo libro se representa con -1
    res.status(200).json(lastBook);
  });

  //Devuelve el libro de mitad de lista
  // GET http://localhost:3000/middle
  app.get("/middle", (req, res) => {
    const middleBook = books[50]; // está en el numero 50 del array
    res.status(200).json(middleBook);
  });

//Devuelve el LIBRO del autor Dante-Alighieri 
// GET http://localhost:3000/data/books/author/dante-alighieri
app.get("/data/books/author/dante-alighieri", (req, res) => {
    const authorName = req.params.authorName; // capturamos "dante-alighieri"
  
    // buscar el primer libro de ese autor
    const book = books.find((book) => book.author.toLowerCase() === authorName.toLowerCase());
  
    if (book) {
      res.status(200).json({ title: book.title }); // solo enviamos el título
    } else {
      res.status(404).json({ msj: "Libro no encontrado" });
    }
  });


//Devuelve el PAIS de origen del autor Dante-Alighieri 
// GET http://localhost:3000/data/books/country/author/dante-alighieri
app.get("/data/books/country/author/dante-alighieri", (req, res) => {
  
    // Buscar el libro del autor Dante Alighieri
    const book = books.find((book) => book.author.toLowerCase() === "dante alighieri");
  
    if (book) {
      res.status(200).json({ country: book.country }); // solo enviamos el país
    } else {
      res.status(404).json({ msj: "País no encontrado" });
    }
  });

  
//Devuelve las PAGINAS y AÑO del libro del autor Dante-Alighieri 
// GET http://localhost:3000/data/books/year&pages/author/dante-alighieri
app.get("/data/books/year&pages/author/dante-alighieri", (req, res) => {
  
    // Buscar el libro del autor Dante Alighieri
    const book = books.find((book) => book.author.toLowerCase() === "dante alighieri");
  
    if (book) {
      res.status(200).json({ year: book.year, pages: book.pages, }); // solo enviamos el país
    } else {
      res.status(404).json({ msj: "Datos no encontrados" });
    }
  });
  

//Devuelve Numero de libros de España
// GET http://localhost:3000/data/books/country/count/spain
app.get("/data/books/country/count/spain", (req, res) => {
    // Filtrar libros cuyo país sea España
    const spanishBooks = books.filter((book) => book.country.toLowerCase() === "spain");
  
    // Contar cuantos hay
    const numberOfSpanishBooks = spanishBooks.length;
  
    res.status(200).json({ total: numberOfSpanishBooks });
  });
