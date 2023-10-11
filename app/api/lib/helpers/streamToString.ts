import { StringDecoder } from "string_decoder";

export const streamToString = async (stream: any): Promise<string> => {
  let textData = ''
  const decoder = new StringDecoder('utf-8');
  for await (const chunk of stream) {
    textData += decoder.write(chunk);
  }
  return textData
};