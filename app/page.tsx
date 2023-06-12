"use client";

import { useEffect, useState } from "react";
import moment from "moment";

export default function Home() {
  const initialTransactions: any[] = [];
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [expenseAmount, setExpenseAmount] = useState("");
  const [dailyAllocation, setDailyAllocation] = useState("");

  useEffect(() => {
    setEndDate(localStorage?.getItem("endDate") || "");
    setAmount(localStorage?.getItem("amount") || "");
    setDailyAllocation(localStorage?.getItem("dailyAllocation") || "");
    setTransactions(JSON.parse(localStorage?.getItem("transactions") || "[]"));
  }, []);

  const saveDetails = () => {
    localStorage?.setItem("endDate", endDate);
    localStorage?.setItem("amount", amount);
    localStorage?.setItem(
      "dailyAllocation",
      (parseInt(amount) / (moment(endDate).diff(moment(), "days") + 1)).toFixed(
        2
      )
    );

    setDailyAllocation(
      (parseInt(amount) / (moment(endDate).diff(moment(), "days") + 1)).toFixed(
        2
      )
    );
  };

  const resetDetails = () => {
    localStorage?.removeItem("endDate");
    localStorage?.removeItem("amount");
    localStorage?.removeItem("dailyAllocation");
    localStorage?.removeItem("transactions");

    setDailyAllocation("");
    setTransactions([]);
  };

  const addNewExpense = () => {
    let tempTransactions = [
      ...transactions,
      {
        date: moment().format("YYYY-MM-DD"),
        name: expenseName,
        amount: expenseAmount,
      },
    ];

    localStorage?.setItem("transactions", JSON.stringify(tempTransactions));
    setTransactions(tempTransactions);
    setExpenseName("");
    setExpenseAmount("");
  };

  const removeExpense = (index: any) => {
    let tempTransactions = [...transactions];

    tempTransactions.splice(index, 1);
    localStorage?.setItem("transactions", JSON.stringify(tempTransactions));
    setTransactions(tempTransactions);
  };

  if (!!dailyAllocation) {
    let pastTransactions = transactions.filter(
      (transaction: any) => transaction.date !== moment().format("YYYY-MM-DD")
    );
    let transactionsToday = transactions.filter(
      (transaction: any) => transaction.date === moment().format("YYYY-MM-DD")
    );
    let dailyConsumed = transactionsToday.reduce(
      (totalConsumed: any, currentTransaction: any) =>
        totalConsumed + parseFloat(currentTransaction.amount),
      0
    );
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen min-h-screen">
          <h1 className="text-3xl font-medium mb-5">Welcome, James!</h1>
          <p className="text-4xl font-medium text-center">
            {(parseFloat(dailyAllocation) - dailyConsumed).toFixed(2)}
          </p>
          <p className="text-xl font-regular text-center">remaining</p>
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 sm:p-8">
              {transactionsToday.map((transaction: any, index: any) => (
                <div
                  key={index}
                  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4"
                >
                  <div className="p-4 flex align-middle justify-between">
                    <div>
                      <div>
                        <div className="text-lg font-semibold">
                          {transaction.name}
                        </div>
                        <div>{transaction.amount}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800 my-2"
                      onClick={() => removeExpense(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <div>
                    <label
                      htmlFor="expenseName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      name="expenseName"
                      id="expenseName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Food"
                      required={true}
                      value={expenseName}
                      onChange={(event) => setExpenseName(event.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="expenseAmount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      name="expenseAmount"
                      id="expenseAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1,000"
                      required={true}
                      value={expenseAmount}
                      onChange={(event) => setExpenseAmount(event.target.value)}
                    />
                  </div>
                  <button
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
                    onClick={addNewExpense}
                  >
                    Add Expense
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 mt-4"
                onClick={resetDetails}
              >
                Reset Details
              </button>
              {pastTransactions.map((transaction: any, index: any) => (
                <div
                  key={index}
                  className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-4"
                >
                  <div className="p-4 flex align-middle justify-between">
                    <div>
                      <div>
                        <div className="text-lg font-semibold">
                          {transaction.name}
                        </div>
                        <div>{transaction.amount}</div>
                      </div>
                    </div>
                    <div>{moment(transaction.date).format("MMM DD")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-3xl font-medium mb-10">Welcome, James!</h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <label
                htmlFor="endDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required={true}
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                min={moment().format("YYYY-MM-DD")}
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1,000"
                required={true}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
            <button
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={saveDetails}
            >
              Save
            </button>
            {/* {!!endDate ? (
              <div>{(moment(endDate).diff(moment(), "days") + 1)} days</div>
            ) : null} */}
          </div>
        </div>
      </div>
    </section>
  );
}
