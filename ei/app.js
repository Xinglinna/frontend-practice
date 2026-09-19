const cities = [
    { id: 1, name: '昆明', weather: 'sunny',  temp: 22 },
    { id: 2, name: '北京', weather: 'cloudy', temp: 18 },
    { id: 3, name: '上海', weather: 'rainy',  temp: 20 },
    { id: 4, name: '广州', weather: 'sunny',  temp: 32 },
    { id: 5, name: '成都', weather: 'cloudy', temp: 19 },
    { id: 6, name: '三亚', weather: 'sunny',  temp: 35 },
    { id: 7, name: '哈尔滨', weather: 'rainy', temp: 12 },
    { id: 8, name: '武汉', weather: 'sunny',  temp: 28 }
];

let currentFilter = 'all';
const listBox = document.querySelector('#weather-list-box');
const render = () => {
    if (!listBox) return;
    listBox.innerHTML = '';

    const shown = cities.filter(city => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'hot') return city.temp >= 30;
        return city.weather === currentFilter;
    });

    if (shown.length === 0) {
        listBox.innerHTML = '<div class="col-12 text-center text-muted">没有符合条件的城市</div>';
        return;
    }

    const weatherText = { sunny: '晴天', cloudy: '多云', rainy: '雨天' };
    const weatherColor = { sunny: 'text-warning', cloudy: 'text-secondary', rainy: 'text-primary' };

    shown.forEach(city => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${city.name}</h5>
                    <p class="card-text">天气：<span class="${weatherColor[city.weather]}">${weatherText[city.weather]}</span></p >
                    <p class="card-text">温度：${city.temp}℃</p >
                </div>
            </div>
        `;
        listBox.appendChild(col);
    });
};
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    });
});

render();