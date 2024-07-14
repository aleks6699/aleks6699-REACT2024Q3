import { describe, it, expect, vi } from 'vitest';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../utils/controlsParamsSearch';

describe('controlsParamsSearch Utils', () => {
  it('adds parameters correctly', () => {
    const originalLocation = { ...window.location };
    const originalReplaceState = window.history.replaceState;

    // Mock window.location
    window.location = {
      ...window.location,
      search: '?existingParam=123',
    };

    window.history.replaceState = vi.fn();

    addParamsSearch('456', 'newParam');

    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/?existingParam=123&newParam=456'
    );

    window.location = originalLocation;
    window.history.replaceState = originalReplaceState;
  });

  it('removes parameters correctly', () => {
    const originalLocation = { ...window.location };
    const originalReplaceState = window.history.replaceState;

    // Mock window.location
    window.location = {
      ...window.location,
      search: '?existingParam=123&removeParam=456',
    };

    window.history.replaceState = vi.fn();

    removeParamsSearch('removeParam');

    expect(window.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/?existingParam=123'
    );

    window.location = originalLocation;
    window.history.replaceState = originalReplaceState;
  });
});
