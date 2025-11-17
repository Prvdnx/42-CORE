import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const WeeklyTemperatureChart = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  // Extraire les données pour les 7 jours
  const weekData = forecastData.slice(0, 7);
  
  const data = {
    labels: weekData.map((item, index) => {
      if (index === 0) return 'Today';
      // Extraire le jour de la semaine directement de la string formatée "Wed, Jul 23"
      return item.date.split(',')[0].trim();
    }),
    datasets: [
      {
        data: weekData.map(item => item.minTemp),
        color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`, // Bleu pour min temperature
        strokeWidth: 3,
      },
      {
        data: weekData.map(item => item.maxTemp),
        color: (opacity = 1) => `rgba(220, 20, 60, ${opacity})`, // Rouge pour max temperature
        strokeWidth: 3,
      },
    ],
    legend: ["Min temperature", "Max temperature"]
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#f8f9fa',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
    },
    fillShadowGradientFrom: 'rgba(0, 122, 255, 0.1)',
    fillShadowGradientTo: 'rgba(0, 122, 255, 0.05)',
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
        verticalLabelRotation={0}
        horizontalLabelRotation={0}
        fromZero={false}
        withLegend={true}
      />
    </View>
  );
};

export default WeeklyTemperatureChart;
