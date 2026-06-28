/*
===========================================
HYBRID TRACKER
Utilities Module
Version 0.3.0
===========================================
*/

const TrackerUtils = {

    formatDate(date = new Date()) {
        return new Intl.DateTimeFormat("es-MX", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);
    },

    formatWeight(value) {
        const n = Number(value);
        return Number.isFinite(n) ? `${n.toFixed(1)} kg` : "-";
    },

    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    uuid() {
        return crypto.randomUUID
            ? crypto.randomUUID()
            : "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
    },

    today() {
        return new Date().toISOString().split("T")[0];
    },

    downloadJSON(filename, data) {
        const blob = new Blob(
            [JSON.stringify(data, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    readJSONFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = e => {
                try {
                    resolve(JSON.parse(e.target.result));
                } catch (err) {
                    reject(err);
                }
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

};
