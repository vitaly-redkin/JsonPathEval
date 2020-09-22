/**
 * Module to contain application defaults.
 */
import { JsonModel, JsonProcessingStatus } from '../models/JsonModel';

// Default JSON string to use
const defaultJsonStr: string = `
{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
  }
  `;

// Number of times to repeat book array - to provide large-enough sample data
const COUNT: number = 300;

// Default JSON object to use
const defaultJsonObj: object = JSON.parse(defaultJsonStr);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(defaultJsonObj as any).store.book = [].concat(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...Array.from({ length: COUNT }, () => (defaultJsonObj as any).store.book));


// Default JSON Path expression 
const defaultPathExpr: string = '';

/**
 * Default common state.
 */
export const defaultJson: JsonModel = new JsonModel(
  JsonProcessingStatus.Idle,
  defaultJsonStr,
  defaultJsonObj,
  defaultPathExpr,
  [],
  '',
);
