console.log('app loaded!');

(async () => {
  const res = await fetch('/weather?address=boston');
  const json = await res.json();
  console.log(json);
})();

const getWeather = async (address) => {
  const res = await fetch(`/weather?address=${encodeURIComponent(address)}`);
  const json = await res.json();
  return json;
};

const submitBtn = document.getElementById('submit-btn');
const searchInput = document.querySelector('input');
const resultDiv = document.querySelector('.result');

if (submitBtn) {
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    resultDiv.textContent = 'Loading...';

    const weather = await getWeather(searchInput.value);

    resultDiv.innerHTML = `<pre>${JSON.stringify(weather, null, 2)}</pre>`;
  });
}
