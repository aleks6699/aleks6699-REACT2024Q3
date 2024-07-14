import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useLoader } from '../hooks/useLoader';

describe('useLoader hook', () => {
  it('initializes isLoading as false', () => {
    const { result } = renderHook(() => useLoader());

    expect(result.current.isLoading).toBe(false);
  });

  it('sets isLoading correctly', () => {
    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('toggles isLoading', () => {
    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });
});
