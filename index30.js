// Function to populate user names into the dropdown dynamically
function populateUserNames() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userNameSelect = document.getElementById("userNameSelect");
  
    // Get all unique usernames
    const userNames = [...new Set(userData.map(entry => entry.userName))];
  
    // Add usernames to the dropdown
    userNames.forEach(userName => {
      const option = document.createElement("option");
      option.value = userName;
      option.textContent = userName;
      userNameSelect.appendChild(option);
    });
  }
  
  // Call the function to populate usernames when the page loads
  window.onload = function() {
    populateUserNames();
  };
  
  // Function to export filtered user data to a CSV file
  function exportUserDataToCSV() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    
    // Get filter values
    const selectedUserName = document.getElementById("userNameSelect").value;
    const startDate = document.getElementById("startDateSelect").value;
    const endDate = document.getElementById("endDateSelect").value;
  
    // Filter the data based on selected criteria
    const filteredData = userData.filter(entry => {
      let matches = true;
  
      // Filter by user name
      if (selectedUserName !== "all" && entry.userName !== selectedUserName) {
        matches = false;
      }
  
      // Filter by date range (start and end date)
      if (startDate && endDate) {
        const entryDate = new Date(entry.timestamp).toLocaleDateString();
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        if (new Date(entryDate) < startDateObj || new Date(entryDate) > endDateObj) {
          matches = false;
        }
      }
  
      return matches;
    });
  
    // Check if there is any data to export
    if (filteredData.length === 0) {
      alert("No data available to export based on the selected filters.");
      return;
    }
  
    // Define the CSV headers
    const headers = ["User Name", "Action", "Timestamp", "Latitude", "Longitude"];
  
    // Map the filtered data to CSV rows
    const rows = filteredData.map(entry => [
      entry.userName,
      entry.action,
      entry.timestamp,
      entry.location.latitude,
      entry.location.longitude,
    ]);
  
    // Add the headers as the first row
    rows.unshift(headers);
  
    // Convert the rows to CSV format
    const csvContent = rows.map(row => row.join(",")).join("\n");
  
    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Create a link element for downloading the file
    const link = document.createElement("a");
  
    // Create an object URL for the Blob and set it as the href for the link
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_data_filtered.csv");
  
    // Append the link to the document body
    document.body.appendChild(link);
  
    // Trigger the click event to start the download
    link.click();
  
    // Remove the link from the document
    document.body.removeChild(link);
  }
  
