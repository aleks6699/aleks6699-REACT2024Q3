import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  addParamsSearch,
  removeParamsSearch,
} from '../utils/controlsParamsSearch';

describe('URL parameter functions', () => {
  beforeEach(() => {
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      pathname: '/current/path',
      search: '?existingParam=value',
    } as Location);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('addParamsSearch', () => {
    it('should add a parameter to the URL', () => {
      addParamsSearch('123', 'id');

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        '/current/path?existingParam=value&id=123'
      );
    });

    it('should overwrite existing parameter with the same name', () => {
      addParamsSearch('456', 'existingParam');

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        '/current/path?existingParam=456'
      );
    });
  });

  describe('removeParamsSearch', () => {
    it('should remove a parameter from the URL', () => {
      vi.spyOn(window, 'location', 'get').mockReturnValue({
        pathname: '/current/path',
        search: '?existingParam=value',
      } as Location);

      removeParamsSearch('existingParam');

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        '/current/path?'
      );
    });

    it('should not affect URL if parameter is not present', () => {
      vi.spyOn(window, 'location', 'get').mockReturnValue({
        pathname: '/current/path',
        search: '?existingParam=value',
      } as Location);

      removeParamsSearch('nonExistentParam');

      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        '',
        '/current/path?existingParam=value'
      );
    });
  });
});
