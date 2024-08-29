export const formatDate = (originalDate: Date) => {
  const date = new Date(originalDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0から始まるため+1する
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}年${month}月${day}日`;

  return formattedDate;
};

export const formatAndConvertNextDate = (originalDate: Date) => {
  const date = new Date(originalDate);
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0から始まるため+1する
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
};
