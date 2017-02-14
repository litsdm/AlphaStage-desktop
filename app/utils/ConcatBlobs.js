export default function ConcatenateBlobs (blobs, type, callback) {
  var buffers = [];

  var index = 0;

  function readAsArrayBuffer() {
    if (!blobs[index]) {
      return concatenateBuffers();
    }
    var reader = new FileReader();
    reader.onload = function(event) {
      buffers.push(event.target.result);
      console.log(event.target.result);
      index++;
      readAsArrayBuffer();
    };
    reader.readAsArrayBuffer(blobs[index]);
  }

  readAsArrayBuffer();

  function concatenateBuffers() {
    var byteLength = 0;
    buffers.forEach(function(buffer) {
      byteLength += buffer.byteLength;
    });

    var tmp = new Uint16Array(byteLength);
    var lastOffset = 0;
    buffers.forEach(function(buffer) {
      // BYTES_PER_ELEMENT == 2 for Uint16Array
      var reusableByteLength = buffer.byteLength;
      if (reusableByteLength % 2 != 0) {
        buffer = buffer.slice(0, reusableByteLength - 1)
      }
      tmp.set(new Uint16Array(buffer), lastOffset);
      lastOffset += reusableByteLength;
    });

    console.log([tmp.buffer]);
    var blob = new Blob([tmp.buffer], {
      type: type
    });

    callback(blob);
  }
}
