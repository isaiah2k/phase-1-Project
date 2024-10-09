const baseURL = 'http://localhost:3000/habits'

const habitForm = document.getElementById('habit-form')
const habitList = document.getElementById('habit-list')

function loadHabits() {
  fetch(baseURL)
    .then(res => res.json())
    .then(habits => {
      renderHabits(habits)
    })
    .catch(error => console.error('Error loading habits:', error))
}

function renderHabits(habits) {
  habits.forEach(habit => {
    const habitItem = document.createElement('li')
    habitItem.textContent = `${habit.name} (${habit.frequency}) ${habit.progress}`

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => deleteHabit(habit.id))

    habitItem.appendChild(deleteButton)

    habitList.appendChild(habitItem)
  })
}

function addHabit() {
  const habitName = document.getElementById('habit-name').value
  const habitFrequency = document.getElementById('habit-frequency').value

  const newHabit = {
    name: habitName,
    progress: 0,
    frequency: habitFrequency
  }

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newHabit)
  })
    .then(res => res.json())
    .then(addedHabit => {
      renderHabits([addedHabit])
    })
    .catch(error => console.error('Error adding habit:', error))
}
function deleteHabit(id) {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      loadHabits()
    })
    .catch(error => console.error('Error deleting habit:', error))
}

loadHabits()

habitForm.addEventListener('submit', addHabit)

