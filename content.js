chrome.storage.sync.get("autoCheckAll", function(data) {
  if (data.autoCheckAll) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.autoCheckAll && changes.autoCheckAll.newValue) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
  } else {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
});
