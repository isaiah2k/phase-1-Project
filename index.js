//nightmode
document.addEventListener('keydown', (event) => {
  if (event.key === '`') {
    document.body.classList.toggle('night-mode')
    localStorage.setItem('nightMode', document.body.classList.contains('night-mode') ? 'enabled' : 'disabled')
  }
})

if (localStorage.getItem('nightMode') === 'enabled') {
  document.body.classList.add('night-mode')
}

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

  habitList.replaceChildren()

  habits.forEach(habit => {
    const habitItem = document.createElement('li')
    habitItem.textContent = `${habit.name}             (${habit.frequency})             ${habit.progress}`

    const progressButton = document.createElement('button')
    progressButton.textContent = '+1'
    progressButton.addEventListener('click', () => updateHabit(habit.id, habit.progress))

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => deleteHabit(habit.id))

    habitItem.appendChild(progressButton)
    
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

function updateHabit(id, currentProgress) {
  fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progress: currentProgress + 1 })
  })
    .then(() => {
      loadHabits()
    })
    .catch(error => console.error('Error updating habit'))
}

function deleteHabit(id) {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      loadHabits()
    })

}

loadHabits()

habitForm.addEventListener('submit', addHabit)

