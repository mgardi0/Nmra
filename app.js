// داتای بەشەکان و کەمترین نمرەی وەرگرتن (وەک نموونە بۆ ساڵی ڕابردوو)
const colleges = [
    { name: "پزیشکی گشتی (هەولێر)", minScore: 100.14, type: "medical" },
    { name: "پزیشکی ددان", minScore: 98.8, type: "medical" },
    { name: "دەرمانسازی", minScore: 98.5, type: "medical" },
    { name: "ئەندازیاری تەلارسازی", minScore: 97.0, type: "engineering" },
    { name: "ئەندازیاری شارستانی", minScore: 95.0, type: "engineering" },
    { name: "پەرستاری", minScore: 93.0, type: "medical" },
    { name: "ئەندازیاری نەرمەواڵە (Software)", minScore: 94.0, type: "engineering" },
    { name: "بایۆلۆجی - زانست", minScore: 90.0, type: "science" },
    { name: "شیکاری تاقیگەیی", minScore: 94.0, type: "science" },
    { name: "کیمیا", minScore: 88.0, type: "science" },
    { name: "فیزیا", minScore: 80.0, type: "science" },
    { name: "یاسا", minScore: 88.0, type: "humanities" },
    { name: "کارگێڕی و ئابووری", minScore: 75.0, type: "humanities" },
    { name: "ئاداب (ئینگلیزی)", minScore: 85.0, type: "humanities" },
    { name: "پەروەردەی بنەڕەت", minScore: 65.0, type: "humanities" },
    { name: "پەیمانگای تەکنیکی (شیکاری/ددان)", minScore: 92.0, type: "institute" },
    { name: "پەیمانگای تەکنیکی کارگێڕی", minScore: 65.0, type: "institute" }
];

document.getElementById("gradeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ڕێگری دەکات لە ڕیفرێش بوونەوەی پەڕەکە

    // وەرگرتنی نمرەکان لە فۆڕمەکەوە
    const math = parseFloat(document.getElementById("math").value);
    const biology = parseFloat(document.getElementById("biology").value);
    const chemistry = parseFloat(document.getElementById("chemistry").value);
    const physics = parseFloat(document.getElementById("physics").value);
    const english = parseFloat(document.getElementById("english").value);
    const kurdish = parseFloat(document.getElementById("kurdish").value);
    const arabic = parseFloat(document.getElementById("arabic").value);

    // هەژمارکردنی تێکڕای گشتی (بەبێ کریدیت - کۆی گشتی دابەشی 7)
    const totalGrades = math + biology + chemistry + physics + english + kurdish + arabic;
    const baseAverage = (totalGrades / 7).toFixed(2);

    // هەژمارکردنی تێکڕای زانستی (Scientific Weighted Average)
    // لەم سیستمەدا کێشی زیاتر دەدەین بە (بیرکاری، فیزیا، کیمیا، زیندەوەرزانی)
    const scientificWeight = (math * 1.5) + (biology * 1.5) + (chemistry * 1.5) + (physics * 1.5) + (english * 1.2) + (kurdish * 1.0) + (arabic * 1.0);
    const totalWeights = 1.5 + 1.5 + 1.5 + 1.5 + 1.2 + 1.0 + 1.0;
    const weightedAverage = (scientificWeight / totalWeights).toFixed(2);

    // پیشاندانی نمرەکان لە ڕووکارەکە
    document.getElementById("totalScore").innerText = baseAverage;
    document.getElementById("weightedScore").innerText = weightedAverage;

    // فلتەرکردنی بەشەکان بەپێی نمرەی قوتابییەکە
    // بەکارهێنانی نمرەی زانستی بۆ بەشە پزیشکی و ئەندازیارییەکان، وە نمرەی ئاسایی بۆ بەشەکانی تر
    const eligibleColleges = colleges.filter(college => {
        if(college.type === "medical" || college.type === "engineering" || college.type === "science") {
            return parseFloat(weightedAverage) >= college.minScore;
        } else {
            return parseFloat(baseAverage) >= college.minScore;
        }
    });

    // پیشاندانی بەشە گونجاوەکان لەسەر شاشەکە
    const collegesListDiv = document.getElementById("collegesList");
    collegesListDiv.innerHTML = ""; // خاوێنکردنەوەی لیستی پێشوو

    if (eligibleColleges.length === 0) {
        collegesListDiv.innerHTML = `<div class="col-span-2 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-center font-bold">ببورە، بەپێی نمرەکانت چانسی وەرگرتنت لەم لیستەدا کەمە، تکایە بیر لە پەیمانگا تایبەتەکان بکەرەوە.</div>`;
    } else {
        // ڕیزبەندکردنی بەشەکان لە بەرزترینەوە بۆ نزمترین
        eligibleColleges.sort((a, b) => b.minScore - a.minScore);

        eligibleColleges.forEach(college => {
            // دیاریکردنی ڕەنگ بەپێی جۆری بەشەکە
            let badgeColor = "bg-blue-100 text-blue-700";
            if(college.type === "medical") badgeColor = "bg-emerald-100 text-emerald-700";
            if(college.type === "engineering") badgeColor = "bg-orange-100 text-orange-700";

            const cardHtml = `
                <div class="flex justify-between items-center p-4 bg-white/80 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all">
                    <span class="font-bold text-slate-700">${college.name}</span>
                    <span class="px-3 py-1 rounded-lg text-sm font-bold ${badgeColor}">${college.minScore}</span>
                </div>
            `;
            collegesListDiv.innerHTML += cardHtml;
        });
    }
});
