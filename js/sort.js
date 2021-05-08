class Sort {
  constructor(apiData) {
    this.data = apiData;

    /** sorting variables */
    this.sortedByUserId = false;
  }

  /** function for sorting according to user id */
  byUserId() {
    this.data = !this.sortedByUserId
      ? this.data = this.data.sort((u1, u2) => u2.userId - u1.userId)
      : this.data = this.data.sort((u1, u2) => u1.userId - u2.userId);
    this.sortedByUserId = !this.sortedByUserId;
    return this.data;
  }
}