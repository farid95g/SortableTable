const table = document.querySelector("table");
const tableHeader = document.querySelector("table thead");
const tableBody = document.querySelector("table tbody");

/** Testing Area */
console.log(table);
console.log(tableHeader);
console.log(tableBody);

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => json.filter(todo => todo.id <= 10))
  .then(
    json => json.forEach(todo => {
      const row = `
        <tr>
          <td scope="row" class="px-4">${todo.userId}</td>
          <td class="px-4">${todo.id}</td>
          <td class="px-4">${todo.title}</td>
          <td class="px-4">${todo.completed}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    })
  );