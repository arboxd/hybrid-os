# Database Design

## Status

Draft

## Main Entities

User

Workout

Exercise

TrainingSession

RecoveryRecord

SleepRecord

NutritionRecord

Competition

Goal

Metric

Notification

AIRecommendation

---

## Relationships

User
 ├── Workouts
 ├── Recovery Records
 ├── Nutrition Records
 ├── Competitions
 ├── Goals

Workout
 ├── Exercises

Competition
 ├── Training Plan

