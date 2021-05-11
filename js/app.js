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

  /** next button click handler */
  nextBtn.addEventListener("click", e => {
    pagination.next(e, pageNums.querySelector("ul"));
  });

  /** previous button click handler */
  previousBtn.addEventListener("click", e => {
    pagination.previous(e, pageNums.querySelector("ul"));
  });

  /** pagination elements click handler */
  pageNums.querySelectorAll("ul li").forEach((num, i) => {
    num.addEventListener("click", e => {
      table.clean(tBody);
      pagination.makeActive(pageNums.querySelector("ul li.active"), num);
      table.getData(data, i * 10, (i * 10) + 9).fill(tBody);
      e.preventDefault();
    });
  });

  /** getting current page */
  const currentPage = () => {
    const activePage = document.querySelector("li.page-nums li.page-item.active");
    return [...pageNums.querySelectorAll("ul li")].indexOf(activePage);
  }

  /** function for refreshing table after sorting data */
  const refreshTable = (sData) => {
    const index = currentPage();
    table.clean(tBody);
    table.getData(sData, index * 10, (index * 10) + 9).fill(tBody);
  }

  /** function for changing icon when data is sorted */
  const changeIcon = (elm) => {
    const icon = elm.querySelector("i");
    if (icon.classList.contains("d-none")) {
      icon.classList.remove("d-none");
    } else {
      if (icon.className.indexOf("up") !== -1) {
        icon.className.indexOf("numeric") !== -1
          ? icon.classList.replace("fa-sort-numeric-up", "fa-sort-numeric-down")
          : icon.classList.replace("fa-sort-alpha-up", "fa-sort-alpha-down");
      } else {
        icon.className.indexOf("numeric") !== -1
          ? icon.classList.replace("fa-sort-numeric-down", "fa-sort-numeric-up")
          : icon.classList.replace("fa-sort-alpha-down", "fa-sort-alpha-up");
      }
    }
  }

  /** table headers click handler for sorting table data */
  tHeaders.forEach(th => {
    th.addEventListener("click", e => {
      const sortedData = sort[th.dataset.func]();
      refreshTable(sortedData);
      changeIcon(th.querySelector("span"));
    })
  })
})();