import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result) => { setScreenData(result.window) };

    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  const isLandscape = screenData.width > screenData.height;
  const operators = ['+', '-', '*', '/'];

  const handleBtnPress = (value) => {
    console.log(`Button pressed: ${value}`);
    const lastChar = expression.slice(-1);

    if (operators.includes(value)) { // handle operators
      if (expression === '0' && value === '-') return setExpression(value);
      if (!expression) return;
      operators.includes(lastChar) ? // replace last operator if present
        setExpression(expression.slice(0, -1) + value) : setExpression(expression + value);
      return;
    }

    if (value === '.' && expression.match(/\.\d*$/)) return; // handle decimal point

    setExpression(expression === '0' ? value : expression + value);
  };

  const handleClear = () => {
    console.log('Button pressed :AC');
    setExpression('0'); setResult('0');
  };

  const handleDelete = () => {
    console.log('Button pressed :C');
    expression.length > 1 ? setExpression(expression.slice(0, -1)) : setExpression('0');
  };

  const evaluateExpression = (expr) => {
    try {
      if (!/^[\d+\-*\/.() ]+$/.test(expr)) throw new Error('Invalid characters');
      if (expr.includes('/0') && !expr.includes('/0.')) throw new Error('Division by zero');
      
      const result = Function(`"use strict"; return (${expr})`)();
      return !isFinite(result) ? 'Error' : result.toString();
    } catch (error) {
      console.error('Evaluation error:', error);
      return 'Error';
    }
  };

  const handleEquals = () => {
    console.log('Button pressed: =');
    if (!expression || expression === '0') return;
    
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(expression.slice(-1))) {
      return Alert.alert('Error', 'Expression cannot end with operator');
    }

    const calculatedResult = evaluateExpression(
      expression.replace(/×/g, '*').replace(/÷/g, '/')
    );
    
    if (calculatedResult === 'Error') {
      Alert.alert('Error', 'Invalid expression');
      setResult('Error');
    } else {
      setResult(calculatedResult);
      setExpression(calculatedResult);
    }
  };

  const btnRowConfig = [
    ['AC', 'C', '/', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.']
  ];

  const getBtnStyle = (value) => {
    const style = [styles.btn];
    if (['/', '*', '-', '+'].includes(value)) style.push({ backgroundColor: '#B6771D' });
    if (['AC', 'C'].includes(value)) style.push({ backgroundColor: '#a6a6a6' });
    if (value === '=') style.push({ backgroundColor: '#B6771D' });
    if (value === '0') style.push({ width: 155, borderRadius: 35 });
    return style;
  };

  const renderBtn = (value, onPress) => {
    const style = getBtnStyle(value);
    if (isLandscape) {
      style.push(styles.btnLandscape);
      if (value === '0') style.push({width: 125, borderRadius: 8});
    }
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Text style={[styles.btnText, isLandscape && {fontSize: 18}]}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View /*Header*/ style={styles.container}>
      <View style={[styles.header, isLandscape && {paddingTop: 20, paddingBottom: 10}]}>
        <Text style={[styles.title, isLandscape && {fontSize: 20}]}>Calculator</Text>
      </View>

      <View /*Display*/ style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={[{padding: 20, marginBottom: 10}, isLandscape && styles.displayLandscape]}>
          <TextInput 
            style={[styles.expressionInput, isLandscape && styles.expressionInputLandscape]}
            editable={false} value={expression} multiline={true}
          />
          <TextInput 
            style={[styles.resultInput, isLandscape && {fontSize: 20, minHeight: 25}]}
            value={result} editable={false}
          />
        </View>

        <View /*Buttons*/ style={[{padding: 20} , isLandscape && {paddingVertical: 15, paddingHorizontal: 10}]}>
          {btnRowConfig.map((row, index) => (
            <View key={index} style={[styles.row, isLandscape && styles.rowLandscape]}>
              {row.map((btn) => {
                const handler = btn === 'AC' ? handleClear 
                  : btn === 'C' ? handleDelete 
                  : btn === '=' ? handleEquals 
                  : () => handleBtnPress(btn.toString());
                
                return renderBtn(btn, handler);
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  expressionInput: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'right',
    marginBottom: 10,
    minHeight: 40,
  },
  resultInput: {
    fontSize: 48,
    color: '#fff',
    textAlign: 'right',
    fontWeight: '300',
    minHeight: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  btn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
  },

  //// Landscape styles ////
  displayLandscape: {
    flex: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    minHeight: 60,
  },
  expressionInputLandscape: {
    fontSize: 16,
    marginBottom: 2,
    minHeight: 20,
  },
  btnLandscape: {
    width: 60,
    height: 40,
    borderRadius: 8,
  },
  rowLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    paddingHorizontal: 5,
  }
});
