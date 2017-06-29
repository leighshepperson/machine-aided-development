import {
  expect
} from 'chai';
import {
  addTrainingSet,
  addTestSet
} from './index.spec-data';
import {
  add
} from './../../src/calculator';
import fs from 'fs';
import synaptic from 'synaptic';

describe('Calculator', function() {
  const calculatorNetworkPath = './src/calculator/network.json';
  let perceptron, trainer;

  before(function() {
    const Neuron = synaptic.Neuron,
      Trainer = synaptic.Trainer,
      Architect = synaptic.Architect;

    if (fs.existsSync(calculatorNetworkPath)) {
      perceptron = synaptic.Network.fromJSON(JSON.parse(fs.readFileSync(calculatorNetworkPath)));

      trainer = new Trainer(perceptron);
    } else {
      perceptron = new Architect.Perceptron(2, 3, 10);
      trainer = new Trainer(perceptron);

      const defaults = {
        iterations: 100000,
        log: false,
        shuffle: true,
        cost: Trainer.cost.MSE
      };

      trainer.train(addTrainingSet, defaults);
    }
  })

  after(function() {
    if (!fs.existsSync(calculatorNetworkPath)) {
      fs.writeFileSync(calculatorNetworkPath, JSON.stringify(perceptron.toJSON()));
    }
  })

  describe('network', function() {
    it('adds a to b to obtain a + b', function() {
      const {
        error
      } = trainer.test(addTestSet);

      expect(error).to.be.lessThan(0.15);
    });
  });
})
