import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const TemperatureChart = ({ forecastData }) => {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  // Prendre toutes les 24 heures pour le graphique
  const chartData = forecastData;
  
  const data = {
    labels: chartData.map((item, index) => {
      if (index === 0) return 'Now';
      // Afficher une heure sur 3 pour éviter l'encombrement avec 24h
      if (index % 3 === 0) {
        return item.time.substring(0, 2) + 'h';
      }
      return '';
    }),
    datasets: [
      {
        data: chartData.map(item => item.temperature),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#f8f9fa',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Bleu comme le reste de l'app
    labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`, // Gris foncé pour les labels
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#007AFF', // Bleu pour les points
      fill: '#007AFF'
    },
    fillShadowGradientFrom: 'rgba(0, 122, 255, 0.3)', // Dégradé bleu transparent
    fillShadowGradientTo: 'rgba(0, 122, 255, 0.1)',
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
      />
    </View>
  );
};

export default TemperatureChart;
