import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function moneyformatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$" +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);
  const { amounts } = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div className="inc-exp-container">
      <div className="">
        <h4>Income</h4>
        <p className="money plus">{moneyformatter(income)}</p>
      </div>
      <div className="">
        <h4 >Expense</h4>
        <p className="money minus">{moneyformatter(expense)}</p>
      </div>
    </div>
  );
};
