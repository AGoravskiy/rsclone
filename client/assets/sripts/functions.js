function showMonth(month) {
  const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December '];
  return arr[month];
}

export default function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return ` ${day} ${showMonth(month)} ${year} - ${hours}:${minutes} `;
}
