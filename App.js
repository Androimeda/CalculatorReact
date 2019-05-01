import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      resultText:"",
      calculationText:""
    }
    this.operations =['CE','C','+' , '-', '*','/']
  }

  calculateResult(){
    const text = this.state.resultText
    // here, parse this text 6+7*9+0/9
    // text.split('').forEach(char => {
    //   if(char == '+' || char == '*'){
    //     eval(text)
    //   }
    // })
    this.setState({
      calculationText: eval(text)
    })
  }

  validate(){
    const text =this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
          return false
    }
    return true
  }
  buttonPressed(text){
    // console.log(text)
    if(text == '='){
      return this.validate() && this.calculateResult()
    }
    this.setState({
      resultText: this.state.resultText + text
    })
  }
  operate(operation){
    switch(operation){
      case 'CE':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText:text.join('')
        })
      break
      case 'C':
      this.setState({
        calculationText:"",
        resultText:""
      })
      break
      break
      case '+':
      case '-':
      case '*':
      case '/':
            const lastChar= this.state.resultText.split('').pop()

            if(this.operations.indexOf(lastChar) > 0) return
            if(this.state.resultText == "") return
            this.setState({
              resultText: this.state.resultText + operation
            }) 
          
          

    }
  }
  render() {
    let rows =[]
    let nums=[[1,2,3], [4,5,6] , [7,8,9], ['.',0,'=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j]) } style={styles.btn}>
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                  </TouchableOpacity>)
       }
       rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops=[]
    for (let k = 0; k < 6; k++) {
      ops.push(<TouchableOpacity key={this.operations[k]} onPress={() => this.operate(this.operations[k])} style={styles.btn}>
                <Text style={[styles.btnText, styles.white]}>{this.operations[k]}</Text>
              </TouchableOpacity>)
      
    } 

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
           <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
            <View style={styles.numbers}>
              {rows}
            </View>
            <View style={styles.operations}>
                  {ops}
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnText:{
    fontSize:27,
  },
  btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  calculationText:{
    fontSize:14,
    color:'black',
    justifyContent:"space-around",
    alignItems:"flex-end"
  },
  resultText:{
    fontSize:20,
    color:'black',
    justifyContent:"space-around",
    alignItems:"flex-end"
  },
  white:{
    color:'white'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent:"space-around",
    alignItems:"flex-end"
  },
  calculation:{
    flex: 1,
    backgroundColor: 'gray',
    justifyContent:"space-around",
    alignItems:"flex-end",
  },
  buttons:{
    flex:7,
    flexDirection: 'row'
  },
  numbers:{
    flex:3,
    backgroundColor:'white'
  },
  operations:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'stretch',
    backgroundColor:'black'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'

  }
});
