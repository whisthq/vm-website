export const SEND_FRIENDS_EMAIL = "SEND_FRIENDS_EMAIL";
export const FRIENDS_EMAIL_SENT = "FRIENDS_EMAIL_SENT";
export const TRIGGER_SURVEY = "TRIGGER_SURVEY";

export function sendFriendsEmail(recipients, code) {
    return {
        type: SEND_FRIENDS_EMAIL,
        recipients,
        code,
    };
}

export function friendsEmailSent(status) {
    return {
        type: FRIENDS_EMAIL_SENT,
        status,
    };
}

export function triggerSurvey(trigger) {
    return {
        type: TRIGGER_SURVEY,
        trigger,
    };
}
