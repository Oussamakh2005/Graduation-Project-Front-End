import { config } from "../../utils/config.js";
import { showToast } from "../../utils/showToast.js";
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${config.API_URL}/api/report/adminChart`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });
        const data = await response.json();
        if (data.ok) {
            //create chart :
            const ctx = document.getElementById('salesChart').getContext('2d');
            const salesChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['janFeb', 'marApr', 'mayJun', 'julAug', 'sepOct', 'novDec'],
                    datasets: [{
                        label: 'المبيعات الشهرية ($)',
                        data: [data.data.janFeb,
                            data.data.marApr,
                            data.data.mayJun,
                            data.data.julAug,
                            data.data.sepOct,
                            data.data.novDec,],
                        backgroundColor: '#4CAF50',
                        borderColor: '#388E3C',
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '$' + value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Cairo',
                                    weight: 'bold'
                                }
                            }
                        }
                    }
                }
            });
        } else {
            showToast("فشل الحصول على البيانات يرجى إعادة المحاولة", "error")
        }
    } catch (error) {
        showToast("حدث خطأ غير متوقع يرجى إعادة المحاولة لاحقا", "error");
    }
});