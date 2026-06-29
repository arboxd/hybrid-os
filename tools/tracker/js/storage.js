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
        return this.set('PROFILE', profile);
    },

    loadProfile() {
        return this.get('PROFILE', null);
    },

    saveTraining(progress) {
        return this.set('TRAINING', progress);
    },

    loadTraining() {
        return this.get('TRAINING', {});
    },

    saveExercises(data) {
        return this.set('EXERCISES', data);
    },

    loadExercises() {
        return this.get('EXERCISES', {});
    },

    saveHistory(history) {
        return this.set('HISTORY', history);
    },

    loadHistory() {
        return this.get('HISTORY', []);
    }

};

// EXPORTAR EL MÓDULO (no usar export si es clásico)
window.TrackerStorage = TrackerStorage;
