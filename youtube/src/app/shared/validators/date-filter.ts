const dateFilter = (date: Date | null): boolean => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return !date || date <= currentDate;
};

export default dateFilter;
