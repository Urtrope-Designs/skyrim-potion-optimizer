const fs = require('fs');
const parse = require('csv-parse');
const stringify = require('csv-stringify');

const inputFile = 'input.csv';
const outputFile = 'output.csv';

// Define the algorithm
function calculateResult(values) {
  // Modify this function to apply your own algorithm
  const result = values.reduce((acc, value) => acc + value, 0);
  return result;
}

// Read the input CSV file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the CSV data into an array of arrays
  parse(data, { delimiter: ',' }, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    // Apply the algorithm to each row
    const outputRows = rows.map(row => {
      const values = row.map(parseFloat);
      const result = calculateResult(values);
      return [...row, result];
    });

    // Convert the output rows back into a CSV string
    stringify(outputRows, (err, output) => {
      if (err) {
        console.error(err);
        return;
      }

      // Write the output CSV string to a file
      fs.writeFile(outputFile, output, err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Successfully wrote ${outputRows.length} rows to ${outputFile}`);
      });
    });
  });
});
