// @flow
import callApi from '../utils/apiCaller';

export const TRIGGER_EVENT = 'TRIGGER_EVENT';

export function triggerDefaultEvent(name: string, user: string, analyticsID: string) {
  return () =>
    callApi('analytics', 'post', {
      name,
      user,
      analyticsID
    });
}
