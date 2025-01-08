// Function to generate a backup file
function backupDataToFile() {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
  
    // Create a string representation of the JavaScript file
    const backupFileContent = `
      // Backup Data - Auto-generated
      const userDataBackup = ${JSON.stringify(userData)};
    `;
  
    // Create a Blob with the backup content
    const blob = new Blob([backupFileContent], { type: 'application/javascript' });
  
    // Create a link to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'backup.js';  // The file will be saved as 'backup.js'
    link.click();
  }
  
