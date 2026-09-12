const state = { data: null };

const loadData = async () => {
  $('#status').text('加载中...').show();
  try {
    const response = await fetch('data/weather.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    
    const data = await response.json();
    if (!data.days || data.days.length === 0) {
      $('#status').text('暂无天气数据').show();
      return;
    }

    state.data = data;
    $('#sub-title').text(data.title + ' · 数据来源：昆明市气象局');
    $('#status').hide();
    renderBarChart(data);
    renderLineChart(data);
    console.log('数据加载成功：', data); 
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};
loadData();
let barChart = null;
const renderBarChart = (data) => {
  if (barChart === null) {
    barChart = echarts.init(document.querySelector('#bar-chart'));
  }
  barChart.setOption({
    title: { text: '未来一周相对湿度对比', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: { data: data.days, name: '日期' },
    yAxis: { name: '湿度 (%)' },
    series: [{
      name: '相对湿度',
      type: 'bar',
      data: data.humidity,
      itemStyle: { color: '#3498db' }
    }]
  });
};
let lineChart = null;
const renderLineChart = (data) => {
  if (lineChart !== null) lineChart.destroy();
  
  const ctx = document.querySelector('#line-chart');
  lineChart = new Chart(ctx, {
    type: 'line', 
    data: {
      labels: data.days,
      datasets: [{
        label: '气温 (℃)', 
        data: data.temperatures,
        borderWidth: 2,
        tension: 0.3,
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: { display: true, text: '未来一周气温变化趋势' },
        tooltip: { callbacks: { label: (ctx) => `${ctx.raw} ℃` } }
      },
      scales: { y: { title: { display: true, text: '温度 (℃)' } } }
    }
  });
};