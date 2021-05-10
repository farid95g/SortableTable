class Sort {
  constructor(apiData) {
    this.data = apiData;

    /** sorting variables */
    this.sorted = {
      byUserId: false,
      byTaskId: false,
      byTaskTitle: false,
      byTaskCompletion: false
    };
  }

  sortByColumn(col, prop) {
    if (typeof(this.data[0][col]) === "number") {
      this.sortNum(col, prop);
    } else if (typeof(this.data[0][col]) === "string") {
      this.sortStr(col, prop);
    } else if (typeof(this.data[0][col]) === "boolean") {
      this.sortBool(col, prop);
    }
    this.sorted[prop] = !this.sorted[prop];
    return this.data;
  }

  sortNum(col, prop) {
    this.data = !this.sorted[prop]
        ? this.data = this.data.sort((u1, u2) => u2[col] - u1[col])
        : this.data = this.data.sort((u1, u2) => u1[col] - u2[col]);
  }

  sortStr(col, prop) {
    this.data = !this.sorted[prop]
        ? this.data = this.data.sort((u1, u2) => u2[col].localeCompare(u1[col]))
        : this.data = this.data.sort((u1, u2) => u1[col].localeCompare(u2[col]));
  }

  sortBool(col, prop) {
    this.data = !this.sorted.byTaskCompletion
        ? this.data = this.data.sort((u1, u2) => Number(u2[col]) - Number(u1[col]))
        : this.data = this.data.sort((u1, u2) => Number(u1[col]) - Number(u2[col]));
  }

  /** function for sorting according to user id */
  byUserId() {
    return this.sortByColumn("userId", "byUserId");
  }

  /** function for sorting according to task id */
  byTaskId() {
    return this.sortByColumn("id", "byTaskId");
  }

  /** function for sorting according to task description */
  byTaskTitle() {
    return this.sortByColumn("title", "byTaskTitle");
  }

  /** function for sorting according to task completion */
  byTaskCompletion() {
    return this.sortByColumn("completed", "byTaskCompletion");
  }
}