/*
===========================================
HYBRID TRACKER
Configuration Module
Version 0.3.0
===========================================
*/

const TrackerConfig = {

    APP_NAME: "Hybrid Tracker",

    VERSION: "0.3.0",

    BUILD: "0005",

    DEFAULT_PROFILE: {

        name: "Obed",

        age: 38,

        height: 171,

        weight: 82.1,

        targetWeight: 77,

        goal: "HYROX + Spartan",

        gym: "Smart Fit Tepozan"

    },

    DEFAULT_STATE: {

        week: 1,

        selectedWeek: 1,

        selectedDay: "monday",

        recovery: 85,

        weight: 82.1,

        today: "Push + CrossFit"

    },

    STORAGE_KEYS: {

        PROFILE: "tracker-profile",

        TRAINING: "tracker-training",

        EXERCISES: "tracker-exercises",

        HISTORY: "tracker-history"

    },

    SETTINGS: {

        weightUnit: "kg",

        distanceUnit: "km",

        language: "es-MX",

        autoSave: true

    }

};