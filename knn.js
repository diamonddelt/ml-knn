const _ = require('lodash');

// The 'k' value for determining how many nearest neighbors to consider
const k = 5;

// Data Mapping
// [Building Height (ft), Building Width (X-Axis)(ft), Building Depth (Y-Axis)(ft), Building "Size" Classification]
const outputs = [
    [20,30,8, 'Small'],
    [112,80,70, 'Large'],
    [30,80,80, 'Small'],
    [26,26,26, 'Small'],
    [183,45,90, 'Large'],
    [26,26,26, 'Small'],
    [73,15,45, 'Large'],
    [43,24,9, 'Large'],
    [14,36,25, 'Small'],
    [34,12,45, 'Large']];

// above 30 feet we predict observers will assume the building is 'Large'
// below 30 feet, we predict observers will assume the building is 'Small'
const predictionHeight = 30;

// determines the absolute value of the difference between prediction and actual
// i.e. how close the initial prediction is to the actual heights passed in
function isolateHeightFeature(actualHeight) {
    return Math.abs(actualHeight - predictionHeight);
}

// use Lodash to chain functions to achieve the algorithm's ETL of the outputs data
let res = _.chain(outputs)
            .map(row => [isolateHeightFeature(row[0]), row[3]]) // apply the abs() function using predictor to each row
            .sortBy(row => row[0]) // sort results from map from least to greatest
            .slice(0, k) // slice off only k amount of results i.e. k nearest neighbors
            .countBy(row => row[1]) // count the occurrences of either of the labels 'Small' or 'Large' in the result set
            .toPairs() // convert the countBy() object into an array of KV pairs for further processing
            .sortBy(row => row[1]) // sort the toPairs() array again from least to greatest occurrences of the label 'Small' or 'Large'
            .last() // return the last KV pair from the sorted list to arrive at the desired result
            .first() // return the first actual value from the last KV pair returned in previous step
            .value(); // finally output the results in a readable format

console.log(res)