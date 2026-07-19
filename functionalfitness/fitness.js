const workouts = [
    {
        name: "Full Body Foundations",
        time: 30,
        difficulty: "Beginner",
        type: "Strength",
        exercises: [
            "Bodyweight Squats - 3 x 12",
            "Push-ups - 3 x 10",
            "Dumbbell Rows - 3 x 12",
            "Glute Bridges - 3 x 15",
            "Plank - 3 x 30 sec"
        ]
    },
    {
        name: "Beginner Strength Builder",
        time: 45,
        difficulty: "Beginner",
        type: "Strength",
        exercises: [
            "Goblet Squats - 3 x 10",
            "Dumbbell Shoulder Press - 3 x 12",
            "Walking Lunges - 3 x 10 each leg",
            "Dumbbell Chest Press - 3 x 12",
            "Side Plank - 2 x 20 sec each side"
        ]
    },
    {
        name: "Quick Cardio Start",
        time: 15,
        difficulty: "Beginner",
        type: "Cardio",
        exercises: [
            "Brisk Walk - 5 min",
            "March in Place - 2 min",
            "Jumping Jacks - 30 sec",
            "Step-Ups - 2 min",
            "Light Jog or Walk - 5 min"
        ]
    },
    {
        name: "Beginner Cardio Circuit",
        time: 30,
        difficulty: "Beginner",
        type: "Cardio",
        exercises: [
            "Jump Rope (or imaginary rope) - 2 min",
            "High Knees - 30 sec",
            "Bodyweight Squats - 15 reps",
            "Mountain Climbers - 20 sec",
            "Fast Walk - 3 min",
            "Repeat the circuit 3 times"
        ]
    },
    {
        name: "Daily Mobility Flow",
        time: 15,
        difficulty: "Beginner",
        type: "Mobility",
        exercises: [
            "Cat-Cow Stretch - 10 reps",
            "World's Greatest Stretch - 5 each side",
            "Hip Flexor Stretch - 30 sec each side",
            "Arm Circles - 30 sec",
            "Child's Pose - 1 min"
        ]
    }
];

const bmiForm = document.querySelector("#bmi-form");
const bmiResult = document.querySelector("#bmi-result");
const workoutResults = document.querySelector("#workout-results");


function calculateBMI(weight, heightInInches) {
    return (weight * 703) / (heightInInches * heightInInches);
}

function getBMIRecommendation(bmi) {
    if (bmi < 18.5) {
        return {
            category: "Underweight range",
            workout: "Full Body Foundations",
            message:
                "A beginner strength routine will help you build a foundation and help your body adjust to working out."
        };
    } else if (bmi < 25) {
        return {
            category: "Healthy weight range",
            workout: "Full Body Foundations",
            message:
                "A balanced strength workout is a good general starting point."
        };
    } else if (bmi < 30) {
        return {
            category: "Overweight range",
            workout: "Quick Cardio Start",
            message:
                "A short beginner cardio workout will be a manageable starting point."
        };
    } else {
        return {
            category: "Higher BMI range",
            workout: "Daily Mobility Flow",
            message:
                "A lower-impact mobility workout will be more comfortable and help your body adjust to working out. "
        };
    }
}

function displayBMIResult(bmi, recommendation) {
    const recommendedWorkout = workouts.find(
        workout => workout.name === recommendation.workout
    );

    const exercises = recommendedWorkout.exercises
        .map(exercise => `<li>${exercise}</li>`)
        .join("");

    bmiResult.innerHTML = `
        <article class="recommended-workout">
            <h3>Your Recommendation</h3>

            <p><strong>Your BMI:</strong> ${bmi.toFixed(1)}</p>
            <p><strong>Category:</strong> ${recommendation.category}</p>
            <p>${recommendation.message}</p>

            <h4>${recommendedWorkout.name}</h4>

            <p>
                ${recommendedWorkout.time} minutes |
                ${recommendedWorkout.difficulty} |
                ${recommendedWorkout.type}
            </p>

            <ul>
                ${exercises}
            </ul>

        </article>
    `;
}

function handleBMISubmit(event) {
    event.preventDefault();

    const feet = Number(document.querySelector("#height-feet").value);
    const inches = Number(document.querySelector("#height-inches").value);
    const weight = Number(document.querySelector("#weight").value);

    const totalHeightInInches = feet * 12 + inches;

    if (totalHeightInInches <= 0 || weight <= 0) {
        bmiResult.innerHTML =
            "<p>Please enter a valid height and weight.</p>";
        return;
    }

    const bmi = calculateBMI(weight, totalHeightInInches);
    const recommendation = getBMIRecommendation(bmi);

    displayBMIResult(bmi, recommendation);
}


function displayWorkouts(workoutList) {
    workoutResults.innerHTML = "";

    if (workoutList.length === 0) {
        workoutResults.innerHTML = `
            <p>No workouts match your selection.</p>
        `;
        return;
    }

    workoutList.forEach(workout => {
        const exerciseList = workout.exercises
            .map(exercise => `<li>${exercise}</li>`)
            .join("");

        const workoutCard = document.createElement("article");
        workoutCard.classList.add("workout-card");

        workoutCard.innerHTML = `
            <h3>${workout.name}</h3>

            <p>
                <strong>Type:</strong> ${workout.type}
            </p>

            <p>
                <strong>Time:</strong> ${workout.time} minutes
            </p>

            <p>
                <strong>Difficulty:</strong> ${workout.difficulty}
            </p>

            <h4>Exercises</h4>

            <ul>
                ${exerciseList}
            </ul>
        `;

        workoutResults.appendChild(workoutCard);
    });
}

if (bmiForm) {
    bmiForm.addEventListener("submit", handleBMISubmit);
}

const workoutTypeButtons = document.querySelectorAll(
    ".workout-type-button"
);

function selectWorkoutType(selectedType) {
    const matchingWorkouts = workouts.filter(
        workout => workout.type === selectedType
    );

    workoutTypeButtons.forEach(button => {
        const isSelected = button.dataset.type === selectedType;

        button.classList.toggle("selected", isSelected);
        button.setAttribute("aria-pressed", isSelected);
    });

    displayWorkouts(matchingWorkouts);
}

workoutTypeButtons.forEach(button => {
    button.addEventListener("click", function () {
        const selectedType = button.dataset.type;
        selectWorkoutType(selectedType);
    });
});
