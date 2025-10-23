import { View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 15}}>A Simple Text</Text>

      <TouchableOpacity 
        onPress={() => console.log('btn pressed')}
        style={{backgroundColor: '#ddd', padding: 10, borderRadius: 5}}
      >
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}


// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
// echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc && source ~/.zshrc
// nvm install 20.19.4 && nvm use 20.19.4
// nvm alias default 20.19.4
