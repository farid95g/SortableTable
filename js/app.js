(async function () {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then(data => data)
    .catch(error => console.error(error));

  /** DOM variables */
  const tableBody = document.querySelector("table tbody");
  const sortBtn = document.querySelectorAll(".sort");
  const pageNums = document.querySelector("li.page-nums");
  const previousBtn = document.querySelector("li.previous");
  const nextBtn = document.querySelector("li.next");
  
  /** pagination variables */
  let i = 1;
  const paginationLength = data.length / 50;

  /**
  * icons when column will be sorted:
  * <i class="fas fa-sort-numeric-up-alt"></i>
  * <i class="fas fa-sort-alpha-up-alt"></i>
  */


  /** function for filling table with data */
  function fillTable(startNum, endNum) {
    data.filter((d, i) => i >= startNum && i <= endNum).forEach(todo => {
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
  };

  /** filling table with first 10 data when page first loads */
  document.addEventListener("DOMContentLoaded", fillTable(0, 9));

  /** function for cleaning table */
  function cleanTable() {
    tableBody.querySelectorAll("tr").forEach(tr => tr.remove());
  }

  /** function for creating pagination list */
  function createPagination() {
    const length = data.length / 10;
      for (let i = length; i > 0; i--) {
        const pagination = `
          <li class="page-item ${i === 1 ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>
        `;
        pageNums.querySelector("ul").insertAdjacentHTML("afterbegin", pagination);
      }
  }

  /** creating pagination when page first loads */
  createPagination();

  /** function for changing the pagination numbers on click of next button */
  nextBtn.addEventListener("click", e => {
    if (i < paginationLength) {
      pageNums.querySelector("ul").style.transform = `translateX(${i * -225}px)`;
      i++;
    }
    e.preventDefault();
  });

  /** function for changing the pagination numbers on click of next button */
  previousBtn.addEventListener("click", e => {
      if (i > 1) {
        pageNums.querySelector("ul").style.transform = `translateX(${(i - 2) * -225}px)`;
        i--;
      }
    e.preventDefault();
  });

  /** function for making the clicked pagination number active */

  function makeActivePage(previousNum, currentNum) {
    previousNum.classList.remove("active");
    currentNum.classList.add("active");
  }

  /** function for paginations */
  pageNums.querySelectorAll("ul li").forEach((num, i) => {
    num.addEventListener("click", e => {
      cleanTable();
      makeActivePage(pageNums.querySelector("ul li.active"), num);
      fillTable(i * 10, (i * 10) + 9);
      e.preventDefault();
    });
  });
})();