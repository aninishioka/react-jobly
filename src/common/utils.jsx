
/** Returns formatter for salaries. */
const SalaryFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Sets token in local storage */
function setLocalUser(token) {
  localStorage.setItem("token", token);
}

/** Gets token from local storage */
function getLocalUser() {
  return localStorage.getItem("token");
}

export { SalaryFormatter, setLocalUser, getLocalUser };
