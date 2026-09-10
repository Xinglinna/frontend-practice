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
