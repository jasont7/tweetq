
export async function fetchRecentTweets(user) {
  const url = `http://localhost:8000/user/recent?user=${user}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
