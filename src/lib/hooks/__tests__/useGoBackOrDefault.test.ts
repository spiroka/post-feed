import { Mock } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useGoBackOrDefault } from '../useGoBackOrDefault';

// vi.mock is hoisted, so we can't init these right away
let back: Mock;
let push: Mock;

vi.mock('next/navigation', async (importActual) => ({
  ...await importActual(),
  useRouter: () => {
    back = vi.fn();
    push = vi.fn();

    return {
      back,
      push
    };
  }
}));

const sessionStorageMock = {
  getItem: vi.fn(),
};

vi.stubGlobal('sessionStorage', sessionStorageMock);

describe('useGoBackOrDefault', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should redirect to default url if there is no previous page', () => {
    sessionStorageMock.getItem.mockReturnValueOnce(null);
    const { result: { current: goBack } } = renderHook(() => useGoBackOrDefault('/'));

    goBack();

    expect(push).toBeCalledWith('/');
    expect(back).not.toHaveBeenCalled();
  });

  it('should redirect to previous page if it exists', () => {
    sessionStorageMock.getItem.mockReturnValueOnce('/posts');
    const { result: { current: goBack } } = renderHook(() => useGoBackOrDefault('/'));

    goBack();

    expect(back).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
