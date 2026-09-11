const list = document.querySelector('#task-list');
let books = [
  { name: '西游记', author: '吴承恩', rating: 9.0 },
  { name: '三国演义', author: '罗贯中', rating: 8.5 }
];
const render = () => {
    list.innerHTML = '';
    if (books.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无图书';
        list.appendChild(li);
        return;
    }
    books.forEach((book) => {
        const li = document.createElement('li');
        li.className = 'book-info';
        li.innerHTML = `${book.name} (作者: ${book.author}) <span class="book-rating">${book.rating}分</span>`;
        list.appendChild(li);
    });
};
render();
const form = document.querySelector('#task-form');
const inputName = document.querySelector('#book-name');
const inputAuthor = document.querySelector('#book-author');
const inputRating = document.querySelector('#book-rating');
const tip = document.querySelector('#tip');
let books = JSON.parse(localStorage.getItem('books') || '[]');
const save = () => localStorage.setItem('books', JSON.stringify(books));
const render = () => {
    list.innerHTML = '';
    if (books.length === 0) { /* ...同上... */ }
    books.forEach((book) => {
        const li = document.createElement('li');
        
        const infoSpan = document.createElement('span');
        infoSpan.className = 'book-info';
        infoSpan.innerHTML = `${book.name} (作者: ${book.author}) <span class="book-rating">${book.rating}分</span>`;
        const delBtn = document.createElement('span');
        delBtn.textContent = '×';
        delBtn.className = 'del';
        delBtn.addEventListener('click', () => {
            books.splice(books.indexOf(book), 1);
            save();
            render();
        });

        li.appendChild(infoSpan);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = inputName.value.trim();
    const author = inputAuthor.value.trim();
    const rating = parseFloat(inputRating.value);

    if (name === '' || author === '' || isNaN(rating)) {
        tip.textContent = '书名、作者和评分都必须填写！';
        return;
    }
    if (rating < 0 || rating > 10) {
        tip.textContent = '评分必须在 0 到 10 之间！';
        return;
    }

    books.push({ name: name, author: author, rating: rating });
    tip.textContent = '';
    inputName.value = '';
    inputAuthor.value = '';
    inputRating.value = '';
    
    save();
    render();
});

render();