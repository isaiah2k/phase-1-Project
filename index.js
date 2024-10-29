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

const habitList = document.getElementById('habit-list')

async function loadHabits() {
  const response = await fetch(baseURL)
  const habits = await response.json()

  renderHabits(habits)
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

    habitItem.append(progressButton, deleteButton)
    
    habitList.append(habitItem)
  })
}

async function addHabit(event) {
  event.preventDefault()

  const newHabit = {
    name: document.getElementById('habit-name').value,
    progress: 0,
    frequency: document.getElementById('habit-frequency').value,
  }

  await fetch(baseURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newHabit)
  })

  loadHabits()
}

async function updateHabit(id, currentProgress) {
  await fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ progress: currentProgress + 1 })
  })
  
  loadHabits()
}

async function deleteHabit(id) {
  await fetch(`${baseURL}/${id}`, {method: 'DELETE'})
      loadHabits()
    }

loadHabits()

document.getElementById('habit-form').addEventListener('submit', addHabit)