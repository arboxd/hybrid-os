/*
===========================================
HYBRID TRACKER
Storage Module
Version 0.3.0
===========================================
*/

const TrackerStorage = {

    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error("Storage get error:", e);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error("Storage set error:", e);
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    },

    saveProfile(profile) {
        return this.set(TrackerConfig.STORAGE_KEYS.PROFILE, profile);
    },

    loadProfile() {
        return this.get(TrackerConfig.STORAGE_KEYS.PROFILE, null);
    },

    saveTraining(progress) {
        return this.set(TrackerConfig.STORAGE_KEYS.TRAINING, progress);
    },

    loadTraining() {
        return this.get(TrackerConfig.STORAGE_KEYS.TRAINING, {});
    },

    saveExercises(data) {
        return this.set(TrackerConfig.STORAGE_KEYS.EXERCISES, data);
    },

    loadExercises() {
        return this.get(TrackerConfig.STORAGE_KEYS.EXERCISES, {});
    },

    saveHistory(history) {
        return this.set(TrackerConfig.STORAGE_KEYS.HISTORY, history);
    },

    loadHistory() {
        return this.get(TrackerConfig.STORAGE_KEYS.HISTORY, []);
    }

};
