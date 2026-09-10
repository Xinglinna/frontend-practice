const records = [
    { name: '张三', book: '西游记', days: 7 },
    { name: '李四', book: '三国演义', days: 3 },
    { name: '王五', book: '水浒传', days: 30 },
    { name: '赵六', book: '红楼梦', days: 0 },
    { name: '孙七', book: '百年孤独', days: 15 },
    { name: '周八', book: '活着', days: 45 },
    { name: '吴九', book: '平凡的世界', days: -2 }
];
const cleanRecords = (list) => list.filter(r => r.days >= 0 && r.days <= 30);
const averageDays = (list) => {
    if (list.length === 0) return 0;
    const total = list.reduce((sum, r) => sum + r.days, 0);
    return (total / list.length).toFixed(2);
};
const longest = (list) => list.reduce((max, r) => (r.days > max.days ? r : max), list[0]);
const overdue = (list) => list.filter(r => r.days > 14).map(r => r.name);

console.log('清洗后:', cleanRecords(records));
console.log('平均借阅天数:', averageDays(cleanRecords(records)));
console.log('借阅最久:', longest(cleanRecords(records)));
console.log('超期名单:', overdue(cleanRecords(records)));
const toLevel = (days) => {
    if (days >= 15) return 'A';
    if (days >= 10) return 'B';
    if (days >= 5) return 'C';
    if (days >= 1) return 'D';
    return 'F';
};
const levelCount = (list) => {
    const result = { A: 0, B: 0, C: 0, D: 0, F: 0 };
    list.forEach(r => {
        result[toLevel(r.days)]++;
    });
    return result;
};
const report = (list) => {
    const valid = cleanRecords(list);
    if (valid.length === 0) return '没有有效借阅记录';

    const dist = levelCount(valid);
    return `有效记录${valid.length}条，平均借阅${averageDays(valid)}天，最长借阅${longest(valid).days}天（${longest(valid).name}借《${longest(valid).book}》）
等级分布 :A${dist.A}人 B${dist.B}人 C${dist.C}人 D${dist.D}人 F${dist.F}人
超期名单：${overdue(valid).join('、') || '无'}`;
};

// 异常处理
try {
    console.log(report(records));
} catch (err) {
    console.error('报告生成失败:', err.message);
}