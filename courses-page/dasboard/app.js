const state = { data: null };
const loadData = () => {
  $('#status').text('加载中...').show();
  const data = {
    "title": "图书馆月度借阅统计",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"],
    "series": [
      { "category": "文学类", "counts": [120, 150, 180, 200, 170, 190] },
      { "category": "科技类", "counts": [80, 90, 110, 130, 140, 160] },
      { "category": "历史类", "counts": [60, 70, 65, 80, 90, 100] }
    ]
  };

  if (!data.series || data.series.length === 0) {
    $('#status').text('暂无数据').show();
    return;
  }

  state.data = data;
  $('#sub-title').text(data.title + ' · 数据来源：课程统一数据集');
  $('#status').hide();
  renderCards(data);
  renderBarChart(data);
  renderLineChart(data);
};
const renderCards = (data) => {
  const months = data.months;
  data.series.forEach(s => {
    const total = s.counts.reduce((sum, n) => sum + n, 0);
    $('#cards').append(`
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title h6">${s.category}</h3>
            <p class="card-text fs-4">${total}</p >
            <p class="card-text small text-muted">共${months.length}个月累计借阅</p >
          </div>
        </div>
      </div>
    `);
  });
};
let barChart = null;

const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: '各月各品类借阅量', left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0 },
    xAxis: { data: data.months },
    yAxis: { name: '册' },
    series: data.series.map(s => ({
      name: s.category,
      type: 'bar',
      data: s.counts
    }))
  });
};
let lineChart = null;

const renderLineChart = (data) => {
  if (lineChart !== null) {
    lineChart.destroy();
  }
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.months,
      datasets: data.series.map(s => ({
        label: s.category,
        data: s.counts,
        borderWidth: 2,
        tension: 0.3
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
        title: { display: true, text: '借阅趋势（单位：册）' }
      }
    }
  });
};
window.addEventListener('resize', () => {
  if (barChart) barChart.resize();
});
loadData();