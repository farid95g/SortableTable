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

  /** function for sorting according to user id */
  byUserId() {
    this.data = !this.sorted.byUserId
      ? this.data = this.data.sort((u1, u2) => u2.userId - u1.userId)
      : this.data = this.data.sort((u1, u2) => u1.userId - u2.userId);
    this.sorted.byUserId = !this.sorted.byUserId;
    return this.data;
  }

  /** function for sorting according to task id */
  byTaskId() {
    this.data = !this.sorted.byTaskId
      ? this.data = this.data.sort((u1, u2) => u2.id - u1.id)
      : this.data = this.data.sort((u1, u2) => u1.id - u2.id);
    this.sorted.byTaskId = !this.sorted.byTaskId;
    return this.data;
  }

  /** function for sorting according to task description */
  byTaskTitle() {
    this.data = !this.sorted.byTaskTitle
      ? this.data = this.data.sort((u1, u2) => u2["title"].localeCompare(u1["title"]))
      : this.data = this.data.sort((u1, u2) => u1["title"].localeCompare(u2["title"]));
    this.sorted.byTaskTitle = !this.sorted.byTaskTitle;
    return this.data;
  }

  /** function for sorting according to task completion */
  byTaskCompletion() {
    this.data = !this.sorted.byTaskCompletion
      ? this.data = this.data.sort((u1, u2) => Number(u2.completed) - Number(u1.completed))
      : this.data = this.data.sort((u1, u2) => Number(u1.completed) - Number(u2.completed));
    this.sorted.byTaskCompletion = !this.sorted.byTaskCompletion;
    return this.data;
  }
}