/**
 * @file Info Bar
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

// -------------------------------------------------------------------------------------------------
// Action Types
// -------------------------------------------------------------------------------------------------

export const INFO_BAR_USAGE_ALLOW = 'INFO_BAR_USAGE_ALLOW';
export const INFO_BAR_USAGE_DENY = 'INFO_BAR_USAGE_DENY';

export const INFO_BAR_MOBILE_SHOW = 'INFO_BAR_MOBILE_SHOW';
export const INFO_BAR_MOBILE_HIDE = 'INFO_BAR_MOBILE_HIDE';
export const INFO_BAR_MOBILE_TOGGLE = 'INFO_BAR_MOBILE_TOGGLE';

// -------------------------------------------------------------------------------------------------
// Action Creators
// -------------------------------------------------------------------------------------------------

// Usage
// -------------------------------------------------------------------------------------------------
export const actionAllowUsageInfoBar = () => {
   return { type: INFO_BAR_USAGE_ALLOW };
};

export const actionDenyUsageInfoBar = () => {
   return { type: INFO_BAR_USAGE_DENY };
};

// Mobile visibility
// -------------------------------------------------------------------------------------------------
export const actionShowInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_SHOW };
};

export const actionHideInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_HIDE };
};

export const actionToggleInfoBarMobile = () => {
   return { type: INFO_BAR_MOBILE_TOGGLE };
};
