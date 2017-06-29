import synaptic from 'synaptic';
import calculatorNetwork from './network';
const Neuron = synaptic.Neuron,
  Trainer = synaptic.Trainer,
  calculatorNetworkPath = './src/calculator/network.json';

let perceptron = synaptic.Network.fromJSON(calculatorNetwork),
  trainer = new Trainer(perceptron);

const prediction = (arr) => {
  console.log(arr);
  let max = arr[0], indexOfMax = 0;

  for(let i = 0; i < arr.length; i++) {
    if(max < arr[i]) {
      max = arr[i];
      indexOfMax = i;
    }
  }

  return indexOfMax;
}

export const add = (a, b) => {
  return prediction(perceptron.activate([a, b]));
}
