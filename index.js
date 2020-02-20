const fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];

const content = document.querySelector('.container');

(function () {
  const row = document.createElement('div');
  row.classList.add('row');
  fruits.forEach(fruit => {
    const col = document.createElement('div');
    col.classList.add('col');
    col.innerHTML = `<div class="col">
      <div class="card">
        <img class="card-img-top" style="height: 300px;" src=${fruit.img}>
        <div class="card-body">
          <h5 class="card-title">${fruit.title}</h5>
          <a href="#" class="btn btn-primary" data-id = ${fruit.id}>Посмотреть цену</a>
          <a href="#" class="btn btn-danger">Удалить</a>
        </div>
      </div>
    </div>
`;
    row.append(col);
  });
  content.append(row);
}());

const contentFruits = content.querySelector('.row');
contentFruits.addEventListener('click', showMePrice);

function showMePrice(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  modal.setContent(`
  <h4>Цена ${fruits[id-1].price}</h4>
  `);
  modal.open();
}

const modal = $.modal({
  title: 'My modal',
  content: `<h4>Modal is open</h4>
          <p>Lorem ipsum dolor sit amet.</p>`,
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Ок',
      type: 'primary',
      handler() {
        modal.close()
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        modal.close()
      }
    }
  ]
});







