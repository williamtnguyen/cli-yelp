const fs = require('fs');
const Review = require('../../db/schemas/review-clean');
const connectToMongo = require('../../db/connect-to-mongo');

// processes 7GB dataset by streaming the file
// rather than running fully buffered function call
// modify each document (date string -> native js date obj), then write to db
function streamDataForMod() {
  const stream = fs.createReadStream(
    '../raw/yelp_academic_dataset_review.json',
    {
      flags: 'r',
      encoding: 'utf-8',
    }
  );
  let buffer = '';

  stream.on('data', function (datum) {
    buffer += datum.toString();
    stageBuffer();
  });

  function stageBuffer() {
    let pos;

    while ((pos = buffer.indexOf('\n')) >= 0) {
      // account for newline at beginning of row
      // discard newline char and continue
      if (pos === 0) {
        buffer = buffer.slice(1);
        continue;
      }

      processCurrLine(buffer.slice(0, pos));
      buffer = buffer.slice(pos + 1);
    }
  }

  function processCurrLine(line) {
    // strip carriage return char
    if (line[line.length - 1] === '\r') {
      line = line.substring(0, line.length - 1);
    }

    if (line.length > 0) {
      try {
        const yelpRevObj = JSON.parse(line);
        const dateString = yelpRevObj.date;

        delete yelpRevObj.date;
        yelpRevObj.date = new Date(dateString);
        const newReview = new Review(yelpRevObj);
        newReview
          .save()
          .then((storedReview) =>
            console.log(`Document ${storedReview.review_id} stored to MongoDB!`)
          )
          .catch((error) =>
            console.log('Could not save the modified document to MongoDB')
          );
      } catch (error) {
        console.log('Could not process document');
      }
    }
  }
}

// Block main thread, connect to mongo, stream data, mod data, write data
connectToMongo(streamDataForMod());
