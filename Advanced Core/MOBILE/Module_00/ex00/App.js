import { View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 15}}>A Simple Text</Text>

      <TouchableOpacity 
        onPress={() => console.log('Button pressed')}
        style={{backgroundColor: '#ddd', padding: 10, borderRadius: 5}}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
