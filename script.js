let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let counter = taskList.length;

    // Function to add task
    function addTask() {
      let taskName = document.getElementById("taskName").value.trim();
      let subject = document.getElementById("subject").value.trim();
      let category = document.getElementById("category").value;
      let deadline = document.getElementById("deadline").value;

      if (taskName === "" || subject === "" || deadline === "") {
        alert("Please fill in all fields.");
        return;
      }

      counter++;
      let task = {
        id: counter,
        task: taskName + " (" + category + ")",
        subject: subject,
        deadline: deadline,
        status: "Ongoing"
      };

      taskList.push(task);
      saveTasks();
      displayTasks();

      // Clear inputs
      document.getElementById("taskName").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("deadline").value = "";
      document.getElementById("category").value = "Others";
    }

    // Function to display tasks
    function displayTasks() {
      let table = document.getElementById("taskTable");
      table.innerHTML = `
        <tr>
          <th>No.</th>
          <th>Task</th>
          <th>Subject</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      `;

      taskList.forEach((t, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerHTML = index + 1;
        row.insertCell(1).innerHTML = t.task;
        row.insertCell(2).innerHTML = t.subject;
        row.insertCell(3).innerHTML = t.deadline;
        row.insertCell(4).innerHTML = t.status;
        row.insertCell(5).innerHTML = `
          <div class="actions">
            <button class="done" onclick="markDone(${index})">Done</button>
            <button class="undo" onclick="markUndo(${index})">Undo</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
      });
    }

    // Mark as done
    function markDone(index) {
      taskList[index].status = "Done";
      saveTasks();
      displayTasks();
    }

    // Undo status
    function markUndo(index) {
      taskList[index].status = "Ongoing";
      saveTasks();
      displayTasks();
    }

    // Delete task
    function deleteTask(index) {
      if (confirm("Are you sure you want to delete this task?")) {
        taskList.splice(index, 1);
        saveTasks();
        displayTasks();
      }
    }

    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }

    // Load tasks when page opens
    window.onload = displayTasks;