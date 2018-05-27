exports.getRightFormatDate = () => {
  const dateObj = new Date();
  console.log('datekldjsfklsd', dateObj);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dateObj.getDay()];
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  console.log(day);

  const year = dateObj.getUTCFullYear();
  const todayDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  const newdate = `${dayName} ,${year}-${month}-${day}`;
  return { newdate, day, todayDate };
};

exports.getRightFormatDate2 = (date) => {
  const dateObj = new Date(date);
  console.log(dateObj);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dateObj.getDay()];
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  console.log(day);

  const year = dateObj.getUTCFullYear();
  const todayDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  console.log('todaydate', todayDate);

  const newdate = `${dayName} ,${year}-${month}-${day}`;
  return { newdate, day, todayDate };
};
