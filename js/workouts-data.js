/*
===========================================
HYBRID TRACKER
Workout Data Module
Version 0.3.0
===========================================
*/

const WorkoutData = {
    week1: {
        monday: {
            name: "Push + CrossFit",
            duration: 90,
            exercises: [
                { name: "Press banca", sets: 4, reps: "6-8", weight: 60, completado: false },
                { name: "Press inclinado mancuerna", sets: 3, reps: "8-10", weight: 22.5, completado: false },
                { name: "Press militar", sets: 3, reps: "8-10", weight: 20, completado: false },
                { name: "Elevaciones laterales", sets: 3, reps: "15", weight: 10, completado: false },
                { name: "CrossFit WOD", sets: 1, reps: "Libre", weight: 0, completado: false }
            ]
        },
        tuesday: {
            name: "Running + Pull",
            duration: 75,
            exercises: [
                { name: "Running Z2", sets: 1, reps: "5 km", weight: 0, completado: false },
                { name: "Dominadas", sets: 4, reps: "5", weight: 0, completado: false },
                { name: "Remo con barra", sets: 4, reps: "8-10", weight: 50, completado: false },
                { name: "Jalón al pecho", sets: 3, reps: "10-12", weight: 55, completado: false },
                { name: "Curl bíceps", sets: 3, reps: "12", weight: 12, completado: false }
            ]
        },
        wednesday: {
            name: "Natación + Pierna",
            duration: 90,
            exercises: [
                { name: "Natación técnica", sets: 1, reps: "1200 m", weight: 0, completado: false },
                { name: "Sentadilla", sets: 4, reps: "6-8", weight: 80, completado: false },
                { name: "Peso muerto rumano", sets: 3, reps: "8-10", weight: 70, completado: false },
                { name: "Prensa", sets: 3, reps: "12", weight: 140, completado: false },
                { name: "Pantorrilla", sets: 4, reps: "15", weight: 60, completado: false }
            ]
        },
        thursday: {
            name: "Tempo Run + Upper",
            duration: 80,
            exercises: [
                { name: "Tempo Run", sets: 1, reps: "6 km", weight: 0, completado: false },
                { name: "Press militar", sets: 4, reps: "8", weight: 22.5, completado: false },
                { name: "Remo mancuerna", sets: 3, reps: "10", weight: 25, completado: false },
                { name: "Face Pull", sets: 3, reps: "15", weight: 25, completado: false },
                { name: "Plancha", sets: 3, reps: "60 seg", weight: 0, completado: false }
            ]
        },
        friday: {
            name: "Natación + Full Body",
            duration: 90,
            exercises: [
                { name: "Natación continua", sets: 1, reps: "1500 m", weight: 0, completado: false },
                { name: "Sentadilla frontal", sets: 3, reps: "8", weight: 60, completado: false },
                { name: "Press banca", sets: 3, reps: "8", weight: 55, completado: false },
                { name: "Dominadas", sets: 3, reps: "5", weight: 0, completado: false },
                { name: "Farmer Walk", sets: 4, reps: "30 m", weight: 24, completado: false }
            ]
        },
        saturday: {
            name: "Long Run",
            duration: 75,
            exercises: [
                { name: "Carrera larga", sets: 1, reps: "10-14 km", weight: 0, completado: false },
                { name: "Movilidad", sets: 1, reps: "20 min", weight: 0, completado: false }
            ]
        },
        sunday: {
            name: "Recovery",
            duration: 30,
            exercises: [
                { name: "Movilidad", sets: 1, reps: "20 min", weight: 0, completado: false },
                { name: "Foam Roller", sets: 1, reps: "15 min", weight: 0, completado: false },
                { name: "Estiramiento", sets: 1, reps: "15 min", weight: 0, completado: false }
            ]
        }
    }
};
