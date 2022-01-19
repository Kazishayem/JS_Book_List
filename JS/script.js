let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


class Book{
    constructor(title,author,isbn) 
    {
         this.title = title;   
         this.author = author;
         this.isbn = isbn;
    }
}

class UI{
    
    static addToBookList(book)
    {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        // console.log(row);
        row.innerHTML = `
          <td> ${book.title}  </td>
          <td> ${book.author}  </td>
          <td> ${book.isbn}  </td>
          <td> <a href ="#"  class ="delete"> X </a> </td>
        `
        list.appendChild(row);
        
    }
    static clearField()
    {
    document.querySelector('#title').value = '',
    document.querySelector('#author').value = '',
    document.querySelector('#isbn').value = '';
    }

    static showAlert(message , className)
    {
        let div = document.createElement('div');
        div.className =`alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div , form);

        setTimeout(() =>{
            document.querySelector('.alert').remove()
        }, 1000)

    }

    static deleteFormBook(target)
    {
        if(target.hasAttribute('href'))
        {
            target.parentElement.parentElement.remove();
            UI.showAlert("Remove Book" , "error")
            Store.removeBook(target.parentElement.previousElementsibling.textContent.trim())


        }


    }
}

// local storage

// class Store
// {
//     static getbooks()
//     {
//         let books;
//         if(localStorage.getItem('books') === null)
//         {
//             books =[];

//         }
//         else{
//             books = JSON.parse(localStorage.getItem('books'));
//         }

//         return books; 
//     }

//     static addBook(book)
//     {
//         let books = Store.getbooks();
//         books.push(book);

//         localStorage.setItem('books' ,JSON.stringify(books));

//     }

//     displayBooks()
//     {
//         let books = Store.getbooks();

//         books.forEach(book => {
//             UI.addToBookList(book);
//         })
//     }
//     static removeBook(isbn)
//     {
//         let books = Store.getbooks();

//         books.forEach((book , index) =>{
//             if(book.isbn === isbn)
//             {
//                 books.splice(index , 1);
//             }

//         })
//         localStorage.setItem('books' ,JSON.stringify(books))
//     }
// }

//add event listenter

form.addEventListener('submit' , newBook);
booklist.addEventListener('click' , removeBook);
Document.addEventListener('DOMContentLoaded' , Store.displayBooks());

//define function

function newBook(e)
{
    

    let title = document.querySelector('#title').value ,
    author = document.querySelector('#author').value ,
    isbn = document.querySelector('#isbn').value;

    let book = new Book(title,author,isbn);
    

    // let UI = new UI();

    if(title === '' || author === '' || isbn === '')
    {
        
        UI.showAlert("Please Fillup All The Fields" , "error")


        

    }
    
    else
    {
        let book = new Book(title,author,isbn);
        

        UI.addToBookList(book);

        UI.clearField();
        UI.showAlert("Book Added Successfully" , "success");

        Store.addBook();

        

    }
    

    e.preventDefault();
}

function removeBook(e)
{
    // let UI = new UI();

    UI.deleteFormBook(e.target);
    // UI.showAlert("Remove Book" , "error")


    e.preventDefault();


}