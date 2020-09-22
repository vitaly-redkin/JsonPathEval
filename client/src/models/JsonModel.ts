
/**
 * Enum for JSON processing statuses.
 */
export enum JsonProcessingStatus {
  Idle = 'Ready',
  LoadingFile = 'Loading file...',
  ParsingFile = 'Parsing file...',
  SearchingJson = 'Searching JSON...',
}

/**
 * Class to contain application JSON model.
 */
export class JsonModel {
  /**
   * Constructor.
   * 
   * @param status current JSON processing status
   * @param jsonStr string with JSON
   * @param json parsed JSON object
   * @param pathExpr JSON expression to evaluate
   * @param selectedPointers selected JSON pointers as returned by JSONPath
   * @param error the last occurred error
   */
  constructor(
    public readonly status: JsonProcessingStatus = JsonProcessingStatus.Idle,
    public readonly jsonStr: string = '',
    public readonly json: object = {},
    public readonly pathExpr: string = '',
    public readonly selectedPointers: string[],
    public readonly error: string = '',
  ) {
  }
}
