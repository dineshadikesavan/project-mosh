import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import ExpenseList from "./components/ExpenseList";
import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 20, category: "Groceries" },
    { id: 3, description: "ccc", amount: 30, category: "Utilities" },
    { id: 4, description: "ddd", amount: 40, category: "Entertainment" },
  ]);

  const onDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    console.log("Deleted Expense successfully!!");
  };

  const onSelectCategory = (categoryName: string) => {
    console.log(categoryName);
    setSelectedCategory(categoryName);
    //setExpenses(expenses.filter((expense) => expense.category == categoryName));
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category == selectedCategory)
    : expenses;

  const onSubmit = (expense) => {
    setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
    console.log(expense);
  };

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmit={onSubmit}></ExpenseForm>
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={onSelectCategory}></ExpenseFilter>
      </div>

      <ExpenseList expenses={visibleExpenses} onDelete={onDelete}></ExpenseList>
    </div>
  );
}

export default App;
