import callApi from '../utils/apiCaller';

export const TRIGGER_EVENT = 'TRIGGER_EVENT';

export function triggerDefaultEvent(name, user, analyticsID) {
  return () =>
    callApi('analytics', 'post', {
      name,
      user,
      analyticsID
    });
}
