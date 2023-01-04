module.exports = {
    JWT_SECRET: 'USER_JWT_TOKEN_SECRET',

    // Job Type.
    JOB_NEW: 0,
    JOB_PROCESSING: 1,
    JOB_COMPLETED: 2,
    JOB_CANCELLED: 3,

    // Notification Type.
    NOTIFICATION_TYPE: {
        APPLY_PROJECT: 0,
        WITHDRAW_PROJECT: 1,
        HIRE: 2,
        DECLINE_APPLY: 3,
        CANCEL_JOB: 4,
        PAY_JOB: 5,
        GIVE_REVIEW: 6,
        POST_NEARBY_PROJECT: 7,
    },
}
