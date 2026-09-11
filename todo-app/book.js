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