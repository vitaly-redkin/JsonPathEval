/**
 * Class to contain application JSON model.
 */
export class JsonModel {
  /**
   * Constructor.
   * 
   * @param jsonStr string with JSON
   * @param json parsed JSON object
   * @param pathExpr JSON expression to evaluate
   */
  constructor(
    public readonly jsonStr: string = '',
    public readonly json: object = {},
    public readonly pathExpr: string = '',
  ) {
  }
}
