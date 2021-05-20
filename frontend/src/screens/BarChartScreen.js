import { Bar } from 'react-chartjs-2'
import moment from 'moment'

const BarChartScreen = ({
  totalRunningSalesMonth,
  totalLastSalesMonth,
  totalLastThirdSalesMonth,
}) => {
  const thirdLastMonth = moment().subtract(2, 'months').format('MMMM')
  const lastMonth = moment().subtract(1, 'months').format('MMMM')
  const runningMonth = moment().subtract(0, 'months').format('MMMM')

  const data = {
    labels: [thirdLastMonth, lastMonth, runningMonth],
    datasets: [
      {
        label: 'Months',
        data: [
          parseInt(totalLastThirdSalesMonth),
          parseInt(totalLastSalesMonth),
          parseInt(totalRunningSalesMonth),
        ],
        backgroundColor: '#c02f7352',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChartScreen
