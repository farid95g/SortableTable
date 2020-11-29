const table = document.querySelector("table");
const tableHeader = document.querySelector("table thead");
const tableBody = document.querySelector("table tbody");
const sortBtn = document.querySelectorAll(".sort");

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
  
sortBtn.forEach((btn, i) => {
  btn.addEventListener("click", e => {
    const rows = document.querySelectorAll("tbody tr");
    const cells = [];
    rows.forEach(row => {
      cells.push(row.children[i].textContent);
    })
    const sorted = cells.sort();
    console.log(sorted)
  });
})

/** Testing Area Below */