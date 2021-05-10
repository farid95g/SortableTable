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

  /** function for refreshing table after sorting data */
  const refreshTable = (sData) => {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    const index = [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
    table.clean(tBody);
    table.getData(sData, index * 10, (index * 10) + 9).fill(tBody);
  }

  document.querySelector("th.user-id").addEventListener("click", () => {
    const sortedData = sort.byUserId();
    refreshTable(sortedData);
  });

  document.querySelector("th.task-id").addEventListener("click", () => {
    const sortedData = sort.byTaskId();
    refreshTable(sortedData);
  });

  document.querySelector("th.task-title").addEventListener("click", () => {
    const sortedData = sort.byTaskTitle();
    refreshTable(sortedData);
  });

  document.querySelector("th.task-completion").addEventListener("click", () => {
    const sortedData = sort.byTaskCompletion();
    refreshTable(sortedData);
  });
})();