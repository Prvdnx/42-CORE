import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [isHello, setIsHello] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>
        {isHello ? 'Hello World!' : 'A Simple Text'}
      </Text>
      
      <TouchableOpacity 
        onPress={() => setIsHello(!isHello)}
        style={{backgroundColor: '#ddd', padding: 10, borderRadius: 5}}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
