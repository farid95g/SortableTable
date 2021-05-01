const tableBody = document.querySelector("table tbody");
const sortBtn = document.querySelectorAll(".sort");
const nextBtn = document.querySelector("li.next");

/**
 * icons when column will be sorted:
 * <i class="fas fa-sort-numeric-up-alt"></i>
 * <i class="fas fa-sort-alpha-up-alt"></i>
 */

function toDoService(url, cb) {
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => cb(data));
  } catch (ex) {
    console.log(`Failed! ${ex}.`);
  } finally {
    console.log("Success!");
  }
}

function fillTable(num) {
  toDoService("https://jsonplaceholder.typicode.com/todos", data => {
    data.filter(d => d.id <= num).forEach(todo => {
      let row = `
        <tr>
          <td scope="row" class="px-4">${todo.userId}</td>
          <td class="px-4">${todo.id}</td>
          <td class="px-4">${todo.title}</td>
          <td class="px-4">${todo.completed}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  });
};

document.addEventListener("DOMContentLoaded", fillTable(10));

function createPagination() {
  quantity = toDoService("https://jsonplaceholder.typicode.com/todos", data => {
    const length = data.length / 10;
    for (i = 0; i < length; i++) {
      const pagination = `
        <li class="page-item"><a class="page-link" href="#">${i + 1}</a></li>
      `;
      nextBtn.insertAdjacentHTML("beforebegin", pagination);
    }
  });
}
createPagination();