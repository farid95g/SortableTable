(async function () {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then(data => data)
    .catch(error => console.error(error));
  
  const table = new Table(data);
  const pagination = new Pagination(data);
  const sort = new Sort(data);

  /** filling table with first 10 data when page first loads */
  document.addEventListener("DOMContentLoaded", table.getData(data, 0, 9).fill(tBody));

  /** creating pagination when page first loads */
  pagination.insert(pageNums.querySelector("ul"));

  /** next button click function */
  nextBtn.addEventListener("click", e => {
    pagination.next(e, pageNums.querySelector("ul"));
  });

  /** previous button click function */
  previousBtn.addEventListener("click", e => {
    pagination.previous(e, pageNums.querySelector("ul"));
  });

  /** pagination elements click function */
  pageNums.querySelectorAll("ul li").forEach((num, i) => {
    num.addEventListener("click", e => {
      pagination.showPage(e, table, tBody, pageNums.querySelector("ul li.active"), num, i);
    });
  });

  document.querySelector("th.user-id").addEventListener("click", () => {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    const sortedData = sort.byUserId();
    table.clean(tBody);
    table.getData(sortedData, index * 10, (index * 10) + 9).fill(tBody);
  });

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