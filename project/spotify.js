async function getSongs() {
  let songs = [];
  try {
    let a = await fetch("http://127.0.0.1:8080/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    for (let i = 0; i < as.length; i++) {
      let href = as[i].getAttribute("href");
      if (href.endsWith(".mp3")) {
        songs.push("http://127.0.0.1:8080/" + href);
      }
    }
  } catch (err) {
    console.error("Failed to fetch songs:", err);
  }

  return songs;
}

async function main() {
  const songs = await getSongs();
  if (songs.length === 0) {
    console.error("No songs found.");
    return;
  }

  const audio = new Audio(songs[0]);
  document.body.addEventListener("click", () => {
    audio.play().catch(err => console.error("Audio play failed:", err));
  });
}
main();