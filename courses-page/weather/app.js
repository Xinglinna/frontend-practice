const weatherData = {
  "kunming": {
    "title": "昆明市未来一周天气趋势",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "下周一"],
    "temperatures": [22, 24, 21, 19, 23, 25, 26, 24],
    "humidity": [45, 50, 80, 85, 60, 40, 45, 50]
  },
  "dali": {
    "title": "大理市未来一周天气趋势",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "下周一"],
    "temperatures": [20, 22, 25, 24, 23, 21, 20, 22],
    "humidity": [50, 55, 45, 40, 55, 60, 65, 60]
  },
  "lijiang": {
    "title": "丽江市未来一周天气趋势",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "下周一"],
    "temperatures": [18, 19, 22, 23, 21, 20, 19, 18],
    "humidity": [55, 60, 50, 45, 50, 55, 60, 60]
  }
};

const state = { data: null };
let barChart = null;
let lineChart = null;
const loadData = (cityKey = 'kunming') => {
  $('#status').text('加载中...').show();
  if (barChart) { barChart.dispose(); barChart = null; }
  if (lineChart) { lineChart.destroy(); lineChart = null; }
  setTimeout(() => {
    try {

      const data = weatherData[cityKey];
      if (!data || !data.days || data.days.length === 0) {
        $('#status').text('暂无该城市数据').show();
        return;
      }

      state.data = data;
      $('#sub-title').text(data.title + ' · 数据来源：昆明市气象局');
      $('#status').hide();
      renderBarChart(data);
      renderLineChart(data);
      
    } catch (error) {
      $('#status').text('加载失败：' + error.message).show();
    }
  }, 300); 
};
const renderBarChart = (data) => {
  barChart = echarts.init(document.querySelector('#bar-chart'));
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
const renderLineChart = (data) => {
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
        title: { display: true, text: '未来一周气温变化趋势' }
      },
      scales: { 
        y: { title: { display: true, text: '温度 (℃)' } } 
      }
    }
  });
};
$('.city-btn').on('click', function() {
  $('.city-btn').removeClass('active btn-primary').addClass('btn-outline-primary');
  $(this).removeClass('btn-outline-primary').addClass('active btn-primary');
  const cityKey = $(this).data('city');
  loadData(cityKey);
});
loadData('kunming');