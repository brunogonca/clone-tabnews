const { exec } = require("node:child_process");

const messageWaiting = "Waiting for Postgres!";
const messageReady = "Postgres Ready!";

const startedAt = Date.now();
function showElapsedTime() {
  return `${((Date.now() - startedAt) / 1000).toFixed(2)}s`;
}

function showLoading() {
  const intervalToUpdateMs = 200;
  const emojis = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
  const index = Math.floor(Date.now() / intervalToUpdateMs) % emojis.length;
  return `${showElapsedTime()} ${emojis[index]}`;
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(`\r ${messageWaiting} ${showLoading()}`);
      checkPostgres();
      return;
    }

    process.stdout.write(`\r 🌚${messageWaiting} - ${showElapsedTime()}`);
    process.stdout.write(`\n 🌞${messageReady}\n`);
  }
}

process.stdout.write(`\n\n🌚${messageWaiting}`);

checkPostgres();
