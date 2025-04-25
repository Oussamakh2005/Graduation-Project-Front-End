const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'المبيعات الشهرية ($)',
      data: [12000, 19000, 3000, 5000, 20000, 30000],
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