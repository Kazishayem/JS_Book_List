let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


class Book{
    constructor(title,author,isbn)  //perameter
    {
         this.title = title;   //property
         this.author = author;
         this.isbn = isbn;
    }
}

class UI{
    constructor()
    {

    }
    addToBookList(book)
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
    clearField()
    {
    document.querySelector('#title').value = '',
    document.querySelector('#author').value = '',
    document.querySelector('#isbn').value = '';
    }

    showAlert(message , className)
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

    deleteFormBook(target)
    {
        if(target.hasAttribute('href'))
        {
            target.parentElement.parentElement.remove();


        }


    }
}

//add event listenter

form.addEventListener('submit' , newBook);
booklist.addEventListener('click' , removeBook);

//define function

function newBook(e)
{
    // console.log("hello");

    let title = document.querySelector('#title').value ,
    author = document.querySelector('#author').value ,
    isbn = document.querySelector('#isbn').value;

    let book = new Book(title,author,isbn);
    // console.log(book);

    let ui = new UI();

    if(title === '' || author === '' || isbn === '')
    {
        // alert('Please Fillup All The Fields');
        

        ui.showAlert("Please Fillup All The Fields" , "error")
        

    }
    
    else
    {
        let book = new Book(title,author,isbn);
        

        ui.addToBookList(book);

        ui.clearField();
        ui.showAlert("Book Added Successfully" , "success");

        

    }
    

    e.preventDefault();
}

function removeBook(e)
{
    let ui = new UI();

    ui.deleteFormBook(e.target);
    ui.showAlert("Remove Book" , "error")


    e.preventDefault();


}