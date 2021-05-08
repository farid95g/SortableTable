class Table {
  constructor(apiData) {
    this.data = apiData;
  }

  /** function for getting 10 rows of data */
  getData(nData, start, end) {
    this.currentData = nData.filter((d, i) => i >= start && i <= end);
    return this;
  }

  /** function for filling table with data */
  fill(tableBody) {
    this.currentData.forEach(todo => {
      tableBody.insertAdjacentHTML("beforeend", this.createRow(todo));
    });
  }

  /** function for creating single row */
  createRow({ userId, id, title, completed }) {
    return `
      <tr>
        <td scope="row" class="px-4">${userId}</td>
        <td class="px-4">${id}</td>
        <td class="px-4 text-capitalize">${title}</td>
        <td class="px-4">${completed}</td>
      </tr>
    `;
  }

  /** function for cleaning table */
  clean(tableBody) {
    tableBody.querySelectorAll("tr").forEach(tr => tr.remove());
  }
}