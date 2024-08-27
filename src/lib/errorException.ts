export class HTTPException extends Error {
  constructor(
    public status: number,
    public options: { message: string }
  ) {
    super(options.message);
  }
}
