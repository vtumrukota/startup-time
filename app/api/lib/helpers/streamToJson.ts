/**
 * Helper method to convert a form-data stream to JSON
 * 
 * @param stream: ReadableStream<Uint8Array> - this type causes some TS errors, but this is essentially what is passed
 * @returns: Promise<any> - the parsed JSON as a promise
 */
export const streamToJson = async (stream: any): Promise<any> => {
  let data = '';
  for await (const chunk of stream) {
    data += new TextDecoder().decode(chunk);
  }

  // Extract array portion of JSON data
  const startIndex = data.indexOf('[');
  const endIndex = data.lastIndexOf(']') + 1; // Include the closing bracket and brace
  const jsonData = data.slice(startIndex, endIndex);

  try {
    const parsedJSON = JSON.parse(jsonData);
    return parsedJSON;
  } catch (err) {
    console.log('Error parsing JSON stream', err);
    console.log('Raw JSON data:', data);
    throw err;
  }
}
