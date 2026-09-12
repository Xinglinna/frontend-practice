let rooms = [
    { id: 1, name: '三楼自习室A', floor: 3, isOpen: true, usage: 40 },
    { id: 2, name: '三楼自习室B', floor: 3, isOpen: false, usage: 0 },
    { id: 3, name: '四楼自习室A', floor: 4, isOpen: true, usage: 80 },
    { id: 4, name: '四楼自习室B', floor: 4, isOpen: true, usage: 60 },
    { id: 5, name: '五楼自习室A', floor: 5, isOpen: true, usage: 30 },
    { id: 6, name: '五楼自习室B', floor: 5, isOpen: false, usage: 0 },
    { id: 7, name: '六楼自习室A', floor: 6, isOpen: true, usage: 50 },
    { id: 8, name: '六楼自习室B', floor: 6, isOpen: false, usage: 0 }
];

let currentFilter = 'all';
const listElement = document.querySelector('#room-list');
const render = () => {
    if (!listElement) return; 
    listElement.innerHTML = '';
    
    const shown = rooms.filter(room => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'open') return room.isOpen === true;
        if (currentFilter.startsWith('floor_')) {
            return room.floor === parseInt(currentFilter.split('_')[1]);
        }
        return true;
    });

    if (shown.length === 0) {
        listElement.innerHTML = '<div class="col-12 text-center text-muted">没有符合条件的自习室</div>';
        return;
    }
    shown.forEach(room => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${room.name}</h5>
                    <p class="card-text">楼层：${room.floor}楼</p >
                    <p class="card-text">状态：<span class="${room.isOpen ? 'text-success' : 'text-danger'}">${room.isOpen ? '开放中' : '已关闭'}</span></p >
                </div>
            </div>
        `;
        listElement.appendChild(col);
    });
};
const filterButtons = document.querySelectorAll('.filters button');
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.filter;
        render();
    });
});
const initChart = () => {
    const chartDom = document.getElementById('bar-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    myChart.setOption({
        title: { text: '各自习室当前使用人数' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: rooms.map(r => r.name) },
        yAxis: { type: 'value' },
        series: [{ data: rooms.map(r => r.usage), type: 'bar' }]
    });

    window.addEventListener('resize', () => myChart.resize());
};
render();
initChart();