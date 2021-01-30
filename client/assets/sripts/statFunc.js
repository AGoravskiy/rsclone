export default async function fetchStat() {
  const res = await fetch('https://nfs-jsu.herokuapp.com/scores');
  const stat = await res.json();
  return stat;
}
