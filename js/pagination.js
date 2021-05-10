class Pagination {
  constructor(apiData) {
    this.data = apiData;
    this.pLength = this.data.length / 50;
    this.length = this.data.length / 10;
    this.i = 1;
  }

  /** method for creating pagination list */
  create(i) {
    return `
      <li class="page-item ${i === 1 ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>
    `;
  }

  /** method for inserting the pagination into DOM */
  insert(list) {
    for (let i = this.length; i > 0; i--) {
      list.insertAdjacentHTML("afterbegin", this.create(i));
    }
  }

  /** method for changing the pagination numbers on click of next button */
  next(e, list) {
    if (this.i < this.pLength) {
      list.style.transform = `translateX(${this.i * -225}px)`;
      this.i++;
    }
    e.preventDefault();
  }

  /** method for changing the pagination numbers on click of previous button */
  previous(e, list) {
    if (this.i > 1) {
      list.style.transform = `translateX(${(this.i - 2) * -225}px)`;
      this.i--;
    }
    e.preventDefault();
  }

  /** method for making the clicked pagination number active */
  makeActive(previous, current) {
    previous.classList.remove("active");
    current.classList.add("active");
  }
}