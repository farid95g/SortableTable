class Pagination {
  constructor(apiData) {
    this.data = apiData;
    this.pLength = this.data.length / 50;
    this.length = this.data.length / 10;
    this.i = 1;
  }

  /** function for creating pagination list */
  create(i) {
    return `
      <li class="page-item ${i === 1 ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>
    `;
  }

  /** function for inserting the pagination into DOM */
  insert(list) {
    for (let i = this.length; i > 0; i--) {
      list.insertAdjacentHTML("afterbegin", this.create(i));
    }
  }

  /** function for changing the pagination numbers on click of next button */
  next(e, list) {
    if (this.i < this.pLength) {
      list.style.transform = `translateX(${this.i * -225}px)`;
      this.i++;
    }
    e.preventDefault();
  }

  /** function for changing the pagination numbers on click of previous button */
  previous(e, list) {
    if (this.i > 1) {
      list.style.transform = `translateX(${(this.i - 2) * -225}px)`;
      this.i--;
    }
    e.preventDefault();
  }

  /** function for making the clicked pagination number active */
  makeActive(previous, current) {
    previous.classList.remove("active");
    current.classList.add("active");
  }

  /** function for fetching data according to selected number */
  showPage(e, t, tB, prev, curr, i) {
    t.clean(tB);
    this.makeActive(prev, curr);
    t.getData(i * 10, (i * 10) + 9).fill(tB);
    e.preventDefault();
  }
}