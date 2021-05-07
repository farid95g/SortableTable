(async function () {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then(data => data)
    .catch(error => console.error(error));
  
  const table = new Table(data);

  /** pagination variables */
  let i = 1;
  const paginationLength = data.length / 50;

  

  /** filling table with first 10 data when page first loads */
  document.addEventListener("DOMContentLoaded", table.getData(0, 9).fill(tBody));

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

  /** function for sorting according to user id */
  function sortByUserId() {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    if (!sortedByUserId) {
      data.sort((d1, d2) => d2.userId - d1.userId);
    } else {
      data.sort((d1, d2) => d1.userId - d2.userId);
    }
    cleanTable();
    fillTable(index * 10, (index * 10) + 9);
    console.log(data);
    sortedByUserId = !sortedByUserId;
  }

  document.querySelector("th.user-id").addEventListener("click", sortByUserId);

  /** function for sorting according to task id */
  function sortByTaskId() {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    if (!sortedByTaskId) {
      data.sort((d1, d2) => d2.id - d1.id);
    } else {
      data.sort((d1, d2) => d1.id - d2.id);
    }
    cleanTable();
    fillTable(index * 10, (index * 10) + 9);
    sortedByTaskId = !sortedByTaskId;
  }

  document.querySelector("th.task-id").addEventListener("click", sortByTaskId);

  /** function for sorting according to task description */
  function sortByTaskTitle() {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    if (!sortedByTaskTitle) {
      data.sort((d1, d2) => d2['title'].localeCompare(d1['title']));
    } else {
      data.sort((d1, d2) => d1['title'].localeCompare(d2['title']));
    }
    cleanTable();
    fillTable(index * 10, (index * 10) + 9);
    sortedByTaskTitle = !sortedByTaskTitle;
  }

  document.querySelector("th.task-title").addEventListener("click", sortByTaskTitle);

  /** function for sorting according to task completion */
  function sortByTaskCompletion() {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    if (!sortedByTaskCompletion) {
      data.sort((d1, d2) => Number(d2.completed) - Number(d1.completed));
    } else {
      data.sort((d1, d2) => Number(d1.completed) - Number(d2.completed));
    }
    cleanTable();
    fillTable(index * 10, (index * 10) + 9);
    sortedByTaskCompletion = !sortedByTaskCompletion;
  }

  document.querySelector("th.task-completion").addEventListener("click", sortByTaskCompletion);
})();