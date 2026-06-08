import { rgbDataURL } from '@/helpers/blur';

describe('rgbDataURL', () => {
  it('returns a data URI string', () => {
    const result = rgbDataURL(100, 150, 200);
    expect(result).toMatch(/^data:image\/gif;base64,/);
  });

  it('returns different outputs for different inputs', () => {
    const a = rgbDataURL(0, 0, 0);
    const b = rgbDataURL(255, 255, 255);
    expect(a).not.toBe(b);
  });

  it('produces a valid base64 string', () => {
    const result = rgbDataURL(163, 163, 163);
    const base64part = result.replace('data:image/gif;base64,', '');
    expect(() => atob(base64part)).not.toThrow();
  });
});
