let barChart = null;
let lineChart = null;
let pieChart = null;  
const loadData = (cityKey = 'kunming') => {
  $('#status').text('加载中...').show();
  if (barChart) { barChart.dispose(); barChart = null; }
  if (lineChart) { lineChart.destroy(); lineChart = null; }
  if (pieChart) { pieChart.dispose(); pieChart = null; } // 新增：清空饼图

  fetch('data/weather.json')
    .then(response => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(jsonData => {
      const data = jsonData[cityKey];

      if (!data || !data.days || data.days.length === 0) {
        $('#status').text('暂无该城市数据').show();
        return;
      }

      $('#sub-title').text(data.title + ' · 数据来源：本地模拟气象数据');
      $('#status').hide();

      renderBarChart(data);
      renderLineChart(data);
      renderPieChart(data);   
    })
    .catch(error => {
      $('#status').text('加载失败：' + error.message).show();
    });
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
const renderPieChart = (data) => {
  pieChart = echarts.init(document.querySelector('#pie-chart'));
  pieChart.setOption({
    title: { text: '本周各天湿度占比', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: '60%',
      data: data.days.map((day, index) => ({
        value: data.humidity[index],
        name: day
      })),
      label: {
        formatter: '{b}: {d}%'  
      }
    }]
  });
};
$('.city-btn').on('click', function() {
  $('.city-btn').removeClass('active btn-primary').addClass('btn-outline-primary');
  $(this).removeClass('btn-outline-primary').addClass('active btn-primary');

  const cityKey = $(this).data('city');
  loadData(cityKey);
});
loadData('kunming');