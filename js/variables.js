/** DOM variables */
const tBody = document.querySelector("table tbody");
const sortBtn = document.querySelectorAll(".sort");
const pageNums = document.querySelector("li.page-nums");
const previousBtn = document.querySelector("li.previous");
const nextBtn = document.querySelector("li.next");


/** sorting variables */
let sortedByUserId = false;
let sortedByTaskId = false;
let sortedByTaskTitle = false;
let sortedByTaskCompletion = false;