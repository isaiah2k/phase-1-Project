const baseURL = 'http://localhost:3000/habits'

const habitForm = document.getElementById('habit-form')
const habitList = document.getElementById('habit-list')

function loadHabits() {
  fetch(baseURL)
    .then(response => response.json())
    .then(habits => {
      renderHabits(habits)
    })
    .catch(error => console.error('Error loading habits:', error))
}

function renderHabits(habits) {
  habits.forEach(habit => {
    const habitItem = document.createElement('li')
    habitItem.textContent = `${habit.name} (${habit.frequency})`

    habitList.appendChild(habitItem)
  })
}

loadHabits()