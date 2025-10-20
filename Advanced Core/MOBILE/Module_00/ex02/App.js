import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');

  const handlePress = (value) => {
    console.log(`Button pressed: ${value}`);
    if (expression === '0' && value !== '.') {
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
  };

  const handleClear = () => {
    console.log('AC pressed');
    setExpression('0');
    setResult('0');
  };

  const handleDelete = () => {
    console.log('C pressed');
    setExpression(expression.length > 1 ? expression.slice(0, -1) : '0');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000', paddingTop: 30}}>
      <Text style={{color: '#fff', fontSize: 24, textAlign: 'center', margin: 10}}>
        Calculator
      </Text>

      <View style={{padding: 20}}>
        <TextInput
          value={expression}
          editable={false}
          style={{color: '#fff', fontSize: 32, textAlign: 'right', marginBottom: 10}}
        />
        <TextInput
          value={result}
          editable={false}
          style={{color: '#fff', fontSize: 48, textAlign: 'right', fontWeight: '300'}}
        />
      </View>

      <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'center'}}>
        {/* Clear buttons */}
        <TouchableOpacity
          onPress={handleClear}
          style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#a6a6a6', 
                  justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text style={{color: '#fff', fontSize: 24}}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#a6a6a6', 
                  justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text style={{color: '#fff', fontSize: 24}}>C</Text>
        </TouchableOpacity>
        
        {/* Operators */}
        {['/', '*', '-', '+'].map((op) => (
          <TouchableOpacity
            key={op}
            onPress={() => handlePress(op)}
            style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#ff9500', 
                    justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <Text style={{color: '#fff', fontSize: 24}}>{op}</Text>
          </TouchableOpacity>
        ))}

        {/* Numbers and equals */}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handlePress(num.toString())}
            style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#333', 
                    justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <Text style={{color: '#fff', fontSize: 24}}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => handlePress('0')}
          style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#333', 
                  justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text style={{color: '#fff', fontSize: 24}}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('.')}
          style={{width: 70, height: 70, borderRadius: 35, backgroundColor: '#333', 
                  justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text style={{color: '#fff', fontSize: 24}}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress('=')}
          style={{width: 155, height: 70, borderRadius: 35, backgroundColor: '#ff9500', 
                  justifyContent: 'center', alignItems: 'center', margin: 5}}>
          <Text style={{color: '#fff', fontSize: 24}}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
