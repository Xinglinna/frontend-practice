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
    console.log('数据加载成功：', data); 
  } catch (error) {
    $('#status').text('加载失败：' + error.message).show();
  }
};
loadData();