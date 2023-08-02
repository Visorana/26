import ErrorRepository from '../..';

describe('ErrorRepository class', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
  });

  test('should add an error to the repo', () => {
    errorRepo.addError(404, 'Page not found');
    expect(errorRepo.errors.size).toBe(1);
    expect(errorRepo.errors.has(404)).toBe(true);
  });

  test.each([
    [404, 'Page not found'],
    [500, 'Internal server error'],
    [400, 'Bad request'],
  ])('should add and retrieve error descriptions correctly', (code, description) => {
    errorRepo.addError(code, description);
    const result = errorRepo.translate(code);
    expect(result).toEqual(description);
  });

  test('should return "Unknown error" for non-existent error code', () => {
    expect(errorRepo.translate(403)).toBe('Unknown error');
  });
});
