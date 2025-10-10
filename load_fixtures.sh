#!/bin/bash
# Script to load initial fixture data into the database

echo "Loading muscle groups and exercises..."
cd setsNreps
python manage.py loaddata api/fixtures/initial_data.json

if [ $? -eq 0 ]; then
    echo "✓ Fixtures loaded successfully!"
    echo ""
    echo "Loaded data:"
    echo "  - 8 Muscle Groups (Chest, Back, Shoulders, Arms, Legs, Abs, Glutes, Cardio)"
    echo "  - 55 Exercises"
    echo ""
else
    echo "✗ Failed to load fixtures"
    exit 1
fi
