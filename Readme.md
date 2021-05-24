<h2>Using API you can do </h2>

List all books
ex: http://localhost:4000/books/ 

List all authors
ex: http://localhost:4000/authors

List all genres
ex: http://localhost:4000/genres

List all authors for a specific book
ex: http://localhost:4000/books/authors/9

List all books for a specific author
ex: http://localhost:4000/authors/books/1

List all genres for a specific book
ex: http://localhost:4000/books/genres/1

Get a single book by ID
ex: http://localhost:4000/books/1

Get a single author by ID
ex:  http://localhost:4000/authors/1

Get a single genre by ID
ex: http://localhost:4000/genres/1

<hr/>

Search for books by ISBN
ex:   http://localhost:4000/books/search/isbn/9781408855669

Search for books by title
ex:   http://localhost:4000/books/search/title/Where

Search for authors by name
ex:   http://localhost:4000/authors/search/name/collins

Search for genres by name
ex:   http://localhost:4000/genres/search/name/Young

<hr/>
As a administrator you should be able to do the following
You should login using password and email 
to Register admin using postman : 
ex http://localhost:4000/users/signup/
    name: admin, 
    email: admin@admin.com,
    password: admin 
After login using http://localhost:4000/login 
Admin can enter dashboard to manage the modules below : 
Create, edit and delete books.
Create, edit and delete authors.
Create, edit and delete genres.

<hr/>

Also the application allow you to search for book using Google Books Api 
check below link after login 

http://localhost:4000/googlebooks





