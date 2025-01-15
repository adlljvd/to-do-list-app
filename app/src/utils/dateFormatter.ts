export const formatTaskDate = (dueDate: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    day: dueDate.getDate(),
    month: months[dueDate.getMonth()],
    year: dueDate.getFullYear(),
  };
};
