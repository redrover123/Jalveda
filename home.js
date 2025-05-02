function fetchData() {
    fetch('http://your-server-ip/get-latest-data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('turbidity').textContent = data.turbidity;
            document.getElementById('tds').textContent = data.tds;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
setInterval(fetchData, 5000);
fetchData();
