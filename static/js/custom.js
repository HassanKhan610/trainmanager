$(document).ready(function () {
    console.log($.fn.jquery);
    //clg Key
    // console.log(`Received data from ${url}:`, data);
    $(document).on('input', 'td[contenteditable="true"]', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in load data table checkboxes
    $(document).on('change', '#load-data-table input[type="checkbox"]', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in hyperparameter data table checkboxes
    $(document).on('change', '#hyperparameter-data-table input[type="checkbox"]', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in test data table checkboxes and dropdowns
    $(document).on('change', '#test-data-table input[type="checkbox"], #test-data-table select', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in trainscope data table checkboxes
    $(document).on('change', '#trainscope-data-table input[type="checkbox"]', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in results data table
    // Note: Assuming 'uneditable' class is used only for the results data table
    $(document).on('input', '#results-data-table td.uneditable', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in date inputs
    $(document).on('change', 'td[contenteditable="true"][data-type="date"]', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in dropdowns (modify as needed)
    $(document).on('change', '#test-data-table select, #trainscope-data-table select', function () {
        setChangesMade(true);
    });
    
    // Event listener for changes in other tables (modify as needed)
    // $(document).on('change', '#other-table-id .other-element-class', function () {
    //     setChangesMade(true);
    // });
    
    // Function to set the state of the "Save" button
    function setChangesMade(changesMade) {
        var saveButton = $('.save-data');
    
        if (changesMade) {
            // Changes have been made, turn the button green and enable it
            saveButton.removeClass('btn-secondary').addClass('btn-success').prop('disabled', false);
        } else {
            // No changes, turn the button grey and disable it
            saveButton.removeClass('btn-success').addClass('btn-secondary').prop('disabled', true);
        }
    }
    
    // Initial state - no changes made, button is grey and disabled
    setChangesMade(false);
    
    $('.add-row').click(function () {
        // Create a new row in the UI
        var newRow = '<tr>' +
            '<td contenteditable="true"></td>' +
            '<td contenteditable="true"></td>' +
            '<td contenteditable="true"></td>' +
            '<td contenteditable="true"></td>' +
            '<td><input type="checkbox" class="load-data-checkbox"></td>' +
            '<td contenteditable="true"></td>' +
            '<td contenteditable="true" class="datetime-picker"></td>' + // Add datetime picker for date
            '<td contenteditable="true" class="datetime-picker"></td>' + // Add datetime picker for date
            '<td contenteditable="true"></td>' +
            '<td contenteditable="true"></td>' +
            // Add more columns as needed...
            '</tr>';
    
        // Append the new row to the descriptor rows table
        var $newRow = $(newRow).appendTo('#descriptor-rows-table tbody');
        alert('Please Enter The Following Before Saving:\n- Symbol \n- Model ID \n- Plan ID \n- Execution Step \n- Start Train Date	\n- End Train Date ');

    
        // Initialize datetime picker for date parameters in the new row
        $newRow.find('.datetime-picker').each(function () {
            handleDateTimePicker($(this));
        });
    
        // Extract data from the new row
        var newData = {};
        $newRow.find('td').each(function (index, cell) {
            newData['column_' + (index + 1)] = $(cell).text().trim();
        });
    
        // Make an AJAX request to the server to save the new data
        saveOrUpdateData(newData, '#descriptor-rows-table');
    }); 
    // Function to initialize datetime picker for a cell
    function initializeDateTimePicker($cell) {
        var originalDate = $cell.text().trim();
        var $input = $('<input type="datetime-local">').val(originalDate).appendTo($cell);
    
        $input.change(function () {
            $cell.text($input.val());
            $cell.data('value', $input.val());
        });
    
        $input.hide();
    
        $cell.click(function () {
            if (!$cell.hasClass('datetime-picker-visible')) {
                $input.show().focus();
                $cell.addClass('datetime-picker-visible');
            } else {
                $input.hide();
                $cell.removeClass('datetime-picker-visible');
            }
        });
    }
    
    // Function to handle datetime picker for both add and duplicate row actions
    function handleDateTimePicker($cell) {
        // Toggle Date-Time Picker on Cell Click
        $cell.click(function (event) {
            event.stopPropagation(); // Prevents the click event from propagating to the document
            $('.datetime-picker-visible').not($cell).removeClass('datetime-picker-visible').find('input').hide();
    
            // Check if the clicked cell should have datetime picker
            if ($cell.hasClass('datetime-picker')) {
                // Create or toggle the visibility of the datetime input field
                if (!$cell.hasClass('datetime-picker-visible')) {
                    var $input = $('<input type="datetime-local">').val(formatDateTimeForInput($cell.text())).appendTo($cell).focus();
    
                    // Change event to update cell value
                    $input.change(function () {
                        var selectedDateTime = $input.val();
                        var formattedDateTime = formatDateTimeForDisplay(selectedDateTime);
    
                        // Add ":00" to the displayed date
                        formattedDateTime += ':00';
    
                        $cell.text(formattedDateTime);
                        $cell.data('value', formattedDateTime);
    
                        // Introduce a slight delay before hiding the input field
                        setTimeout(function () {
                            $input.hide();
                            $cell.removeClass('datetime-picker-visible');
                        }, 100);
                    });
    
                    // Toggle visibility class
                    $cell.addClass('datetime-picker-visible');
                } else {
                    $cell.find('input').hide();
                    $cell.removeClass('datetime-picker-visible');
                }
            }
        });
    }
    // Function to add a new row to the specified table
    $('.duplicate-row').click(function () {
        // Check if a row is selected
        var selectedRow = $('#descriptor-rows-table tbody tr.selected');
    
        if (!selectedRow.length) {
            alert('Please select a row to duplicate.');
            return;
        }
        alert('Please change any 1 primary field!')
        // Clone the selected row
        var clonedRow = selectedRow.clone();
    
        // Remove the 'selected' class from the cloned row
        clonedRow.removeClass('selected');
    
        // Append the cloned row after the selected row
        selectedRow.after(clonedRow);
    
        // Add the 'datetime-picker' class to date cells in the cloned row
        clonedRow.find('[data-type="date"]').addClass('datetime-picker');
    
        // Initialize datetime picker for date parameters in the cloned row

    
        // Make an AJAX request to the server to save the duplicated data
        var duplicatedData = {};
    
        // Iterate over all cells in the cloned row
        clonedRow.find('td').each(function (index, cell) {
            var $cell = $(cell);
    
            // Handle checkbox separately
            if ($cell.find('input[type="checkbox"]').length) {
                var checkbox = $cell.find('input[type="checkbox"]');
                var parameter = checkbox.data('param');
    
                if (parameter) {
                    // Update rowData based on the checkbox state
                    duplicatedData[parameter] = checkbox.prop('checked') ? 1 : 0;
                }
            } else {
                // Copy text content for other cells
                duplicatedData['column_' + (index + 1)] = $cell.text().trim();
            }
        });
    
        // Make an AJAX request to the server to save the duplicated data
        saveOrUpdateData(duplicatedData, '#descriptor-rows-table');
    });

    $('#filter-column-select').change(function () {
        // Reset the filter value and apply filter based on the selected column
        var selectedColumn = $(this).val();
        applyFilterByColumn(selectedColumn);
    });
    function applyFilterByColumn(column) {
        var filterValue = prompt('Enter value to filter rows:');
        if (filterValue !== null) {
            // Convert the input to uppercase for case-insensitive filtering
            filterValue = filterValue.toUpperCase();
    
            // Iterate through each row in the descriptor rows table
            $('#descriptor-rows-table tbody tr').each(function () {
                var $row = $(this);
                var columnValue = $row.find('td:nth-child(' + column + ')').text().trim().toUpperCase();
    
                // Check if the column value matches the filter value
                if (columnValue === filterValue) {
                    $row.show(); // Show the row if it matches
                } else {
                    $row.hide(); // Hide the row if it doesn't match
                }
            });
    
            showRemoveFilterButton(); // Show the "Remove Filter" button
        }
    }
    $('.remove-filter').hide();

// Filter Button Click
$('.filter-rows').click(function () {
    // Prompt the user to select a column for filtering
    var selectedColumn = prompt('Select a column to filter:\n1. Symbol\n2. ModelID\n3. PlanID\n4. ExecutionStep');

    if (selectedColumn !== null) {
        applyFilterByColumn(selectedColumn);
    }
});
// Remove Filter Button Click
$('.remove-filter').click(function () {
    removeFilter();
    hideRemoveFilterButton(); // Hide the "Remove Filter" button
});
// Function to remove filter
function removeFilter() {
    // Show all rows in the descriptor rows table
    $('#descriptor-rows-table tbody tr').show();
}

// Function to show the "Remove Filter" button
function showRemoveFilterButton() {
    $('.remove-filter').show();
}

// Function to hide the "Remove Filter" button
function hideRemoveFilterButton() {
    $('.remove-filter').hide();
}
    // Descriptor Rows Table click handler for highlighting and automatic update
    // Descriptor Rows Table click handler for highlighting and automatic update
    // Descriptor Rows Table click handler for highlighting and automatic update
    $('#descriptor-rows-table tbody').on('click', 'td[contenteditable="true"]', function () {
        handleRowClick($(this));
    });
    $('#descriptor-rows-table tbody').on('click', '.load-data-checkbox', function () {
        const isChecked = $(this).prop('checked');
        const rowData = getRowData($(this).closest('tr'));
        rowData.load_data = isChecked ? 1 : 0;
        rowData.enabled = isChecked ? 1 : 0;

        // Update the database with the new value
        saveOrUpdateData(rowData, '#descriptor-rows-table');
    });
    // Save Data button click handler
    $('.save-data').click(function () {
        saveSelectedRowData('#descriptor-rows-table');
        alert('Data saved successfully!');

        // Reset the changes flag and turn the button grey
        setChangesMade(false);
    });
    $('#descriptor-rows-table tbody tr td[data-type="date"]').each(function () {
        var $cell = $(this);

        // Toggle Date-Time Picker on Cell Click
        $cell.click(function (event) {
            event.stopPropagation(); // Prevents the click event from propagating to the document
            $('.datetime-picker-visible').not($cell).removeClass('datetime-picker-visible').find('input').hide();

            // Create or toggle the visibility of the datetime input field
            if (!$cell.hasClass('datetime-picker-visible')) {
                var $input = $('<input type="datetime-local">').val(formatDateTimeForInput($cell.text())).appendTo($cell).focus();

                // Change event to update cell value
                $input.change(function () {
                    var selectedDateTime = $input.val();
                    var formattedDateTime = formatDateTimeForDisplay(selectedDateTime);
                
                    // Add ":00" to the displayed date
                    formattedDateTime += ':00';
                
                    $cell.text(formattedDateTime);
                    $cell.data('value', formattedDateTime);
                
                    // Introduce a slight delay before hiding the input field
                    setTimeout(function () {
                        $input.hide();
                        $cell.removeClass('datetime-picker-visible');
                    }, 100);
                });

                // Toggle visibility class
                $cell.addClass('datetime-picker-visible');
            } else {
                // $cell.find('input').toggle();
                $cell.find('input').hide();
        $cell.removeClass('datetime-picker-visible');
            }
        });
    });
    
    // Function to format date for input field
    function formatDateTimeForInput(dateTime) {
        return dateTime.replace(' ', 'T') + ':00';
    }

    function formatDateTimeForDisplay(dateTime) {
        return dateTime.replace('T', ' ').substring(0, 16);
    }
    

    // Event listener for checkbox changes in Load Data table
// Event listener for checkbox changes in Load Data table
var checkboxChanges = {};
var dropdownChanges = {};

// Event listener for checkbox changes in Load Data table
$('#load-data-table tbody').on('change', 'input[type="checkbox"]', function () {
    var checkbox = $(this);
    
    // Find the closest table row
    var tableRow = checkbox.closest('tr');
    
    // Retrieve rowData from the data attribute of the row
    var rowData = tableRow.data('rowData');
    
    if (!rowData) {
        console.error('rowData not found for the clicked row.');
        return;
    }

    // Retrieve parameter from the first column of the row
    var parameter = tableRow.find('td:first').text().trim();
    
    if (!parameter) {
        console.error('Parameter not found for the checkbox.');
        return;
    }

    // Update rowData based on the checkbox state
    rowData[parameter] = checkbox.prop('checked') ? 1 : 0;

    // Update the checkboxChanges variable
    checkboxChanges[rowData.model_id] = checkboxChanges[rowData.model_id] || {};
    checkboxChanges[rowData.model_id][parameter] = rowData[parameter];
});
// Event listener for checkbox changes in Hyperparameter Data table
$('#hyperparameter-data-table tbody').on('change', 'input[type="checkbox"]', function () {
    var checkbox = $(this);

    // Find the closest table row
    var tableRow = checkbox.closest('tr');

    // Retrieve rowData from the data attribute of the row
    var rowData = tableRow.data('rowData');

    if (!rowData) {
        console.error('rowData not found for the clicked row.');
        return;
    }

    // Retrieve parameter from the first column of the row
    var parameter = tableRow.find('td:first').text().trim();

    if (!parameter) {
        console.error('Parameter not found for the checkbox.');
        return;
    }

    // Update rowData based on the checkbox state
    rowData[parameter] = checkbox.prop('checked') ? 1 : 0;

    // Update the checkboxChanges variable
    checkboxChanges[rowData.model_id] = checkboxChanges[rowData.model_id] || {};
    checkboxChanges[rowData.model_id][parameter] = rowData[parameter];
});

$('#test-data-table tbody').on('change', 'input[type="checkbox"]', function () {
    var checkbox = $(this);

    // Find the closest table row
    var tableRow = checkbox.closest('tr');

    // Retrieve rowData from the data attribute of the row
    var rowData = tableRow.data('rowData');

    if (!rowData) {
        console.error('rowData not found for the clicked row.');
        return;
    }

    // Retrieve parameter from the first column of the row
    var parameter = tableRow.find('td:first').text().trim();

    if (!parameter) {
        console.error('Parameter not found for the checkbox.');
        return;
    }

    // Update rowData based on the checkbox state
    rowData[parameter] = checkbox.prop('checked') ? 1 : 0;

    // Update the checkboxChanges variable
    checkboxChanges[rowData.model_id] = checkboxChanges[rowData.model_id] || {};
    checkboxChanges[rowData.model_id][parameter] = rowData[parameter];
});
// Assuming this event handler is somewhere in your script dropdown
$('#test-data-table tbody').on('change', 'select', function () {
    var select = $(this);
    var tableRow = select.closest('tr');
    var rowData = tableRow.data('rowData');

    if (!rowData) {
        console.error('rowData not found for the clicked row.');
        return;
    }

    var parameter = tableRow.find('td:first').text().trim();

    if (!parameter) {
        console.error('Parameter not found for the dropdown.');
        return;
    }

    var selectedValue = select.val();
    var currentRowDataValue = rowData[parameter];

    if (selectedValue !== currentRowDataValue) {
        // If the selected value is different from the current rowData value
        rowData[parameter] = selectedValue;
        dropdownChanges[rowData.model_id] = dropdownChanges[rowData.model_id] || {};
        dropdownChanges[rowData.model_id][parameter] = selectedValue;
        select.data('param', parameter);
    } else {
        // If no changes, retain the existing value from the database
        var initialSelectedValue = select.find('option:selected').data('initial-value');
        rowData[parameter] = initialSelectedValue;
        delete dropdownChanges[rowData.model_id];
    }
});



$('#trainscope-data-table tbody').on('change', 'input[type="checkbox"]', function () {
    var checkbox = $(this);

    // Find the closest table row
    var tableRow = checkbox.closest('tr');

    // Retrieve rowData from the data attribute of the row
    var rowData = tableRow.data('rowData');

    if (!rowData) {
        console.error('rowData not found for the clicked row.');
        return;
    }

    // Retrieve parameter from the first column of the row
    var parameter = tableRow.find('td:first').text().trim();

    if (!parameter) {
        console.error('Parameter not found for the checkbox.');
        return;
    }

    // Update rowData based on the checkbox state
    rowData[parameter] = checkbox.prop('checked') ? 1 : 0;

    // Update the checkboxChanges variable
    checkboxChanges[rowData.model_id] = checkboxChanges[rowData.model_id] || {};
    checkboxChanges[rowData.model_id][parameter] = rowData[parameter];
});
    

    
function formatDateTime(dateString) {
    // Assuming dateString is in a valid format, modify this if needed
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    return formattedDate;
}
  
    

    // Function to handle row click for any table
    function handleRowClick(clickedCell) {
        const rowData = getRowData(clickedCell);
        highlightRow(clickedCell);
        fetchDataForOtherTables(rowData);
    }

    // Function to get row data for any table
    function getRowData(clickedCell) {
        const selectedRow = clickedCell.closest('tr');
    
        // Fetch data from the descriptor-rows-table
        const rowData = {
            model_id: parseInt(selectedRow.find('td:nth-child(2)').text(), 10),
            symbol: selectedRow.find('td:nth-child(1)').text(),
            plan_id: parseInt(selectedRow.find('td:nth-child(3)').text(), 10),
            execution_step: parseInt(selectedRow.find('td:nth-child(4)').text(), 10),
            load_data: selectedRow.find('td:nth-child(5) input.load-data-checkbox').prop('checked') ? 1 : 0,
            description: selectedRow.find('td:nth-child(6)').text(),
            start_date: formatDateTime(selectedRow.find('td:nth-child(7)').text()),
            end_date: formatDateTime(selectedRow.find('td:nth-child(8)').text()),
            expiration_to_process: parseFloat(selectedRow.find('td:nth-child(9)').text()),
            enabled: selectedRow.find('td:nth-child(11) input.enabled-checkbox').prop('checked') ? 1 : 0,
            // expiraion_day_only: parseInt(selectedRow.find('td:nth-child(10)').text(), 10),
        };
    
        // Fetch data from other tables
        const loadDataTable = collectDataFromTable('#load-data-table');
        const hyperparameterDataTable = collectDataFromTable('#hyperparameter-data-table');
        const testDataTable = collectDataFromTable('#test-data-table');
        const trainScopeDataTable = collectDataFromTable('#trainscope-data-table');
        const resultsDataTable = collectDataFromTable('#results-data-table');
    
        // Add data from other tables to the rowData object
        Object.assign(rowData, loadDataTable, hyperparameterDataTable, testDataTable, trainScopeDataTable, resultsDataTable);
    
        return rowData;
    }
    

    // Function to highlight a row
    function highlightRow(clickedCell) {
        clickedCell.closest('tr').siblings().removeClass('selected');
        clickedCell.closest('tr').addClass('selected');
    }

    
    const tableUpdateFunctions = {
        '#load-data-table': updateLoadDataTable,
        '#hyperparameter-data-table': updateHyperparameterDataTable,
        '#test-data-table': updateTestDataTable,
        '#trainscope-data-table': updateTrainScopeDataTable,
        '#results-data-table': updateResultsDataTable
        // Add more tables as needed
    };
    // Function to save or update data for any table
    // Function to save or update data for any table
function saveSelectedRowData(tableId) {
    const selectedRow = $(`${tableId} tbody .selected`);
    if (selectedRow.length > 0) {
        const rowData = getRowData(selectedRow.find('td[contenteditable="true"]'));
        const updateFunction = tableUpdateFunctions[tableId];

        if (updateFunction) {
            // Update the table directly
            updateFunction(rowData);
        } else {
            // Save or update data for other tables

            // Apply checkbox changes if any
            if (checkboxChanges[rowData.model_id]) {
                Object.assign(rowData, checkboxChanges[rowData.model_id]);
            }
            if (dropdownChanges[rowData.model_id]) {
                // Iterate through dropdownChanges and update rowData
                for (var parameter in dropdownChanges[rowData.model_id]) {
                    if (dropdownChanges[rowData.model_id].hasOwnProperty(parameter)) {
                        // Only update if the dropdown value is changed
                        if (rowData[parameter] !== dropdownChanges[rowData.model_id][parameter]) {
                            rowData[parameter] = dropdownChanges[rowData.model_id][parameter];
                        }
                    }
                }
                // Clear dropdownChanges for the current model_id after updating rowData
                delete dropdownChanges[rowData.model_id];
            } else {
                // If no changes in dropdowns, take the existing values from the dropdowns
                const architectureDropdown = $('#architectureDropdown');
                const optimizerDropdown = $('#optimizerDropdown');

                rowData['architecture'] = architectureDropdown.find(":selected").text();
                rowData['optimizer'] = optimizerDropdown.find(":selected").text();
            }

            // Save or update data
            saveOrUpdateData(rowData, tableId);
        }
    } else {
        console.error('No row selected for saving.');
    }
}


function saveOrUpdateData(rowData, tableId) {
    // Check if primary key values are present in the rowData
    if (
        !rowData ||
        isNaN(rowData.model_id) ||
        !rowData.symbol ||
        isNaN(rowData.plan_id) ||
        isNaN(rowData.execution_step)
    ) {
        console.error('Incomplete or invalid primary key values for record.');
        return;
    }

    // Fetch the existing data for the record (you need to adjust this based on your backend)
    $.ajax({
        type: 'GET',
        url: '/fetch_data/', // Adjust the URL based on your backend
        data: {
            model_id: rowData.model_id,
            symbol: rowData.symbol,
            plan_id: rowData.plan_id,
            execution_step: rowData.execution_step
        },
        success: function (existingData) {
            const selectedRow = $(`${tableId} tbody .selected`);

            if (existingData.success) {
                // Record exists, check if any field other than the primary ones is changed
                if (isDataChanged(existingData.row_data, rowData)) {
                    // Update checkbox values before checking for changes
                    rowData.load_data = selectedRow.find('td:nth-child(5) input.load-data-checkbox').prop('checked') ? 1 : 0;
                    rowData.enabled = selectedRow.find('td:nth-child(11) input.enabled-checkbox').prop('checked') ? 1 : 0;
                    // ... (update other checkbox values as needed)

                    // Perform update
                    updateRecord(rowData, tableId);
                } else {
                    console.log('No changes in non-primary fields. Skipping update.');
                }
            } else {
                // Record doesn't exist, perform insert
                insertRecord(rowData, tableId);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching existing data:', error);
        }
    });
}
    
    function isDataChanged(existingData, newData) {
        // Compare each field in existingData and newData
        // Return true if any non-primary field is different
        // Modify this logic based on your data structure
        return (
            existingData.symbol !== newData.symbol ||
        existingData.model_id !== newData.model_id ||
        existingData.plan_id !== newData.plan_id ||
        existingData.execution_step !== newData.execution_step ||
        existingData.expiration_to_process !== newData.expiration_to_process ||
        // Add more fields as needed
        // ...
        existingData.strike_to_process !== newData.strike_to_process
        );
    }
    
    function updateRecord(rowData) {
        console.log('rowData before update:', rowData);

        rowData.expiration_to_process = parseInt($('#descriptor-rows-table tbody tr.selected td:nth-child(9)').text().trim(), 10); // Assuming expiration_to_process is in the 5th column, adjust if necessary
        rowData.expiraion_day_only = rowData.expiraion_day_only ? 1 : 0;
        rowData.exclude_expiration_day = rowData.exclude_expiration_day ? 1 : 0;
        rowData.analyze_features = rowData.analyze_features ? 1 : 0;

        rowData.train_model = rowData.train_model ? 1 : 0;

        rowData.use_weight = rowData.use_weight ? 1 : 0;
        rowData.use_oversampled = rowData.use_oversampled ? 1 : 0;

        rowData.run_what_if = rowData.run_what_if ? 1 : 0;
        rowData.save_what_if = rowData.save_what_if ? 1 : 0;

        rowData.enabled = rowData.enabled ? 1 : 0;
        
        // if (dropdownChanges[rowData.model_id]) {
        //     // Update rowData based on the dropdownChanges
        //     for (var parameter in dropdownChanges[rowData.model_id]) {
        //         if (dropdownChanges[rowData.model_id].hasOwnProperty(parameter)) {
        //             // Only update if the dropdown value is changed
        //             if (rowData[parameter] !== dropdownChanges[rowData.model_id][parameter]) {
        //                 rowData[parameter] = dropdownChanges[rowData.model_id][parameter];
        //             }
        //         }
        //     }
        //     // Clear dropdownChanges for the current model_id after updating rowData
        //     delete dropdownChanges[rowData.model_id];
        // }
        if (dropdownChanges[rowData.model_id]) {
            // Check if there are changes for 'architecture'
            if (dropdownChanges[rowData.model_id]['architecture'] !== undefined) {
                rowData['architecture'] = dropdownChanges[rowData.model_id]['architecture'];
            } else {
                // If no changes, take the existing value
                rowData['architecture'] = $('#architectureDropdown').find(":selected").text();
            }
        
            // Check if there are changes for 'optimizer'
            if (dropdownChanges[rowData.model_id]['optimizer'] !== undefined) {
                rowData['optimizer'] = dropdownChanges[rowData.model_id]['optimizer'];
            } else {
                // If no changes, take the existing value
                rowData['optimizer'] = $('#optimizerDropdown').find(":selected").text();
            }
        
            // Clear dropdownChanges for the current model_id after updating rowData
            delete dropdownChanges[rowData.model_id];
        }

        console.log('rowData after update:', rowData);

        // Implement the logic to update the existing record
        // Adjust the URL and other parameters based on your backend
        $.ajax({
            type: 'POST',
            url: '/update_data/',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: JSON.stringify(rowData),
            contentType: 'application/json',
            success: function (response) {
                if (response.success) {
                    console.log('Data updated successfully');
                    console.log(rowData)
                } else {
                    console.error('Error updating data:', response.error);
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX request failed:', error);
            }
        });
    }
    
    function insertRecord(rowData) {
        
        // if (rowData.expiraion_day_only !== '' && rowData.expiraion_day_only !== null) {
        //     rowData.expiraion_day_only = parseInt(rowData.expiraion_day_only, 10);
        // } else {
        //     // Handle the case when 'expiraion_day_only' is an empty string or null
        //     // You might want to set a default value or handle it differently based on your requirements
        //     rowData.expiraion_day_only = 0; // or provide a default value
        // }
        

        rowData.expiraion_day_only = rowData.expiraion_day_only ? 1 : 0;
        rowData.exclude_expiration_day = rowData.exclude_expiration_day ? 1 : 0;
        rowData.analyze_features = rowData.analyze_features ? 1 : 0;

        rowData.train_model = rowData.train_model ? 1 : 0;

        rowData.use_weight = rowData.use_weight ? 1 : 0;
        rowData.use_oversampled = rowData.use_oversampled ? 1 : 0;

        rowData.run_what_if = rowData.run_what_if ? 1 : 0;
        rowData.save_what_if = rowData.save_what_if ? 1 : 0;

        rowData.enabled = rowData.enabled ? 1 : 0;


        //results data
        rowData.result_date_time = '1970-01-01T00:00:00Z';  // Set to a default datetime string, adjust as needed
    rowData.result_train_rows_loaded = 0;
    rowData.result_train_rows_filtered = 0;
    rowData.result_train_accuracy = 0;
    rowData.result_train_true_positive = 0;
    rowData.result_train_false_positive = 0;
    rowData.result_test_row_loaded = 0;
    rowData.result_test_row_filtered = 0;
    rowData.result_test_accuracy = 0;
    rowData.result_test_true_positive = 0;
    rowData.result_test_false_positive = 0;


        // Implement the logic to insert the new record
        // Adjust the URL and other parameters based on your backend
        $.ajax({
            type: 'POST',
            url: '/insert_data/',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            data: JSON.stringify(rowData),
            contentType: 'application/json',
            success: function (response) {
                if (response.success) {
                    console.log('Data inserted successfully');
                    console.log(rowData)
                } else {
                    console.error('Error inserting data:', response.error);
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX request failed:', error);
            }
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Function to collect data from a table
    function collectDataFromTable(tableId) {
        var data = {};
        $(tableId + ' tbody tr').each(function () {
            var key = $(this).find('td:first').text().trim();
            var value = $(this).find('td:last').text().trim();
            data[key] = value;
        });
        return data;
    }

    // Rest of your existing code...

    // Function to fetch data for other tables based on the selected row
    function fetchDataForOtherTables(rowData) {
        fetchLoadData(rowData);
        fetchHyperparameterData(rowData);
        fetchTestData(rowData);
        fetchTrainScopeData(rowData);
        fetchResultsData(rowData);
    }
    // Function to fetch Load Data for the selected row
    // custom.js
// Function to fetch Load Data for the selected row
// Function to fetch Load Data for the selected row
// Function to fetch Load Data for the selected row

//Load Data
function fetchLoadData(rowData) {
    fetchData('/fetch_load_data/', rowData, '#load-data-table', updateLoadDataTable);
}

// Function to update Load Data table with the fetched data
// Function to update Load Data table with the fetched data
function updateLoadDataTable(rowData) {
    // Mapping of parameter names to display names
    var parameterMapping = {
        'expiraion_day_only': 'expiraion_day_only',
        'exclude_expiration_day': 'exclude_expiration_day',
        'min_price_call': 'min_price_call',
        'min_price_call_sql': 'min_price_call_sql',
        'max_price_call': 'max_price_call',
        'max_price_call_sql': 'max_price_call_sql',
        'min_price_put': 'min_price_put',
        'min_price_put_sql': 'min_price_put_sql',
        'max_price_put': 'max_price_put',
        'max_price_put_sql': 'max_price_put_sql',
        'analyze_features': 'analyze_features',
    };

    // Assuming the Load Data table has two columns: Parameter and Value
    var loadDataTable = $('#load-data-table tbody');
    console.log('Data to be sent:', rowData);

    // Clear existing rows in the table
    loadDataTable.empty();

    // Iterate over the specified parameters and add rows to the table
    for (var key in parameterMapping) {
        if (parameterMapping.hasOwnProperty(key) && rowData.hasOwnProperty(key)) {
            var value = rowData[key];

            // Handling Checkbox Values
        
            // Handling Other Values
            // if (value === null || value === 'null') {
            //     value = 0;
            // }

            var row = '<tr><td>' + parameterMapping[key] + '</td>';
            // console.log('Key:', key, 'Value:', value); // Log key-value pairs


            if (key === 'expiraion_day_only' || key === 'analyze_features' || key === 'exclude_expiration_day') {
                // Add checkbox for boolean parameters
                row += '<td><input type="checkbox" ' + (value == 1 ? 'checked' : '') + ' data-param="' + key + '" /></td>';
            } else {
                
                // Add editable content for other parameters
                row += '<td contenteditable="true">' + value + '</td>';
            }

            row += '</tr>';
            // Store rowData in the data attribute of the row
            var tableRow = $(row).appendTo(loadDataTable);
            tableRow.data('rowData', rowData);
        }
    }

    // Save changes to the database
    // saveOrUpdateData(rowData, '#load-data-table');

}

// hyperparameters
function fetchHyperparameterData(rowData) {
    fetchData('/fetch_hyperparameters_data/', rowData, '#hyperparameter-data-table', updateHyperparameterDataTable);
}

// Function to update Load Data table with the fetched data
// Function to update Load Data table with the fetched data
function updateHyperparameterDataTable(rowData) {
    // Mapping of parameter names to display names
    var parameterMapping = {
        'train_model': 'train_model',
        'target': 'target',
        'look_forward_window': 'look_forward_window',
        'look_backward_lstm': 'look_backward_lstm',
        'prediction_threshold': 'prediction_threshold',
        'take_profit_threshold': 'take_profit_threshold',
        'probability_threshold': 'probability_threshold'
    };

    // Assuming the Load Data table has two columns: Parameter and Value
    var hyperparameterDataTable = $('#hyperparameter-data-table tbody');

    // Clear existing rows in the table
    hyperparameterDataTable.empty();

    // Iterate over the specified parameters and add rows to the table
    for (var key in parameterMapping) {
        if (parameterMapping.hasOwnProperty(key) && rowData.hasOwnProperty(key)) {
            var value = rowData[key];
            
            if (value === null || value === 'null') {
                value = 0;
            }
            
            var row = '<tr><td>' + parameterMapping[key] + '</td>';

            if (key === 'train_model' ) {
                // Add checkbox for boolean parameters
                row += '<td><input type="checkbox" ' + (value == 1 ? 'checked' : '') + ' data-param="' + key + '" /></td>';
            } else {
                
                // Add editable content for other parameters
                row += '<td contenteditable="true">' + value + '</td>';
            }

            row += '</tr>';
            // Store rowData in the data attribute of the row
            var tableRow = $(row).appendTo(hyperparameterDataTable);
            tableRow.data('rowData', rowData);
        }
    }
}


// Test
function fetchTestData(rowData) {
    fetchData('/fetch_test_data/', rowData, '#test-data-table', updateTestDataTable);
}

// Function to update Load Data table with the fetched data
// Function to update Load Data table with the fetched data
var architectureOptions = ['Simple LSTM', 'Stacked LSTM', 'Bidirectional LSTM', 'CNN-LSTM', 'Attention Mechanism with LSTM'];
var optimizerOptions = ['ADAM', 'ADAM CLIPNORM=1', 'SGD', 'RMSPROP'];
function updateTestDataTable(rowData) {
    // Mapping of parameter names to display names
    var parameterMapping = {
        'architecture': 'architecture',
        'optimizer': 'optimizer',
        'learning_rate_var': 'learning_rate_var',
        'epochs_var': 'epochs_var',
        'batch_size_var': 'batch_size_var',
        'dropouts_var': 'dropouts_var',
        'lstm_units_var': 'lstm_units_var',
        'cnn_kernel': 'cnn_kernel',
        'cnn_filter': 'cnn_filter',
        'use_weight': 'use_weight',
        'use_oversampled': 'use_oversampled',
        'max_rows': 'max_rows'
        //right side is model name and left side is what you keep
    };

    // Assuming the Load Data table has two columns: Parameter and Value
    var testDataTable = $('#test-data-table tbody');

    // Clear existing rows in the table
    testDataTable.empty();

    // Iterate over the specified parameters and add rows to the table
    for (var key in parameterMapping) {
        if (parameterMapping.hasOwnProperty(key) && rowData.hasOwnProperty(key)) {
            var value = rowData[key];

            if (value === null || value === 'null') {
                value = 0;
            }

            var row = '<tr><td>' + parameterMapping[key] + '</td>';

            if (key === 'use_weight' || key === 'use_oversampled') {
                row += '<td><input type="checkbox" ' + (value == 1 ? 'checked' : '') + ' data-param="' + key + '" /></td>';
            } else if (key === 'architecture' || key === 'optimizer') {
                var options = key === 'architecture' ? architectureOptions : optimizerOptions;
                row += '<td><select id="' + key + 'Dropdown" data-param="' + key + '">';

                for (var i = 0; i < options.length; i++) {
                    var optionValue = options[i];
                    var isSelected = value == optionValue;
                    row += '<option value="' + optionValue + '" ' + (isSelected ? 'selected' : '') + ' data-initial-value="' + optionValue + '">' + optionValue + '</option>';
                }

                row += '</select></td>';
            } else {
                row += '<td contenteditable="true">' + value + '</td>';
            }

            row += '</tr>';
            // testDataTable.append(row); // Use append directly on testDataTable
            var tableRow = $(row).appendTo(testDataTable);
            tableRow.data('rowData', rowData);
        }
    }

}

//train Scope
function fetchTrainScopeData(rowData) {
    fetchData('/fetch_trainscope_data/', rowData, '#trainscope-data-table', updateTrainScopeDataTable);
}
// Function to update Load Data table with the fetched data
// Function to update Load Data table with the fetched data
function updateTrainScopeDataTable(rowData) {
    var parameterMapping = {
        'test_start_date': 'test_start_date',
        'test_end_date': 'test_end_date',
        'run_what_if': 'run_what_if',
        'save_what_if': 'save_what_if',
        'probability_threshold_range': 'probability_threshold_range',
        'take_profit_threshold_range': 'take_profit_threshold_range'
    };

    var trainScopeDataTable = $('#trainscope-data-table tbody');
    trainScopeDataTable.empty();

    for (var key in parameterMapping) {
        if (parameterMapping.hasOwnProperty(key) && rowData.hasOwnProperty(key)) {
            var value = rowData[key];

            if (value === null || value === 'null') {
                value = 0;
            }

            var row = '<tr><td>' + parameterMapping[key] + '</td>';

            if (key === 'run_what_if' || key === 'save_what_if') {
                row += '<td><input type="checkbox" ' + (value == 1 ? 'checked' : '') + ' data-param="' + key + '" /></td>';
            } else if (key === 'test_start_date' || key === 'test_end_date') {
                row += '<td class="datetime-picker" data-param="' + key + '">' + formatDateTimeForDisplay(value) + '</td>';
            } else {
                row += '<td contenteditable="true">' + value + '</td>';
            }

            row += '</tr>';
            var tableRow = $(row).appendTo(trainScopeDataTable);
            tableRow.data('rowData', rowData);
        }
    }

    $('.datetime-picker').each(function () {
        var $cell = $(this);

        // Toggle Date-Time Picker on Cell Click
        $cell.click(function (event) {
            event.stopPropagation(); // Prevents the click event from propagating to the document
            $('.datetime-picker-visible').not($cell).removeClass('datetime-picker-visible').find('input').hide();

            // Create or toggle the visibility of the datetime input field
            if (!$cell.hasClass('datetime-picker-visible')) {
                var $input = $('<input type="datetime-local">').val(formatDateTimeForInput($cell.text())).appendTo($cell).focus();

                // Change event to update cell value
                $input.change(function () {
                    var selectedDateTime = $input.val();
                    var formattedDateTime = formatDateTimeForDisplay(selectedDateTime);
                
                    // Add ":00" to the displayed date
                    formattedDateTime += ':00';
                
                    $cell.text(formattedDateTime);
                    $cell.data('value', formattedDateTime);
                
                    // Introduce a slight delay before hiding the input field
                    setTimeout(function () {
                        $input.hide();
                        $cell.removeClass('datetime-picker-visible');
                    }, 100);
                });

                // Toggle visibility class
                $cell.addClass('datetime-picker-visible');
            } else {
                $cell.find('input').hide();
        $cell.removeClass('datetime-picker-visible');
            }
        });
    });
    

    function formatDateTimeForInput(dateTime) {
        return dateTime.replace(' ', 'T') + ':00';
    }

    function formatDateTimeForDisplay(dateTime) {
        // Assuming dateTime is in the format "YYYY-MM-DDTHH:mm:ss"
        var formattedDateTime = dateTime.replace('T', ' ').substring(0, 19);
        return formattedDateTime;
    }
}

//Results 
function fetchResultsData(rowData) {
    fetchData('/fetch_results_data/', rowData, '#results-data-table', updateResultsDataTable);
}

// Function to update Load Data table with the fetched data
// Function to update Load Data table with the fetched data
function updateResultsDataTable(rowData) {
    // Mapping of parameter names to display names
    var parameterMapping = {
        'result_date_time': 'result_date_time',
        'result_train_rows_loaded': 'result_train_rows_loaded',
        'result_train_rows_filtered': 'result_train_rows_filtered',
        'result_train_accuracy': 'result_train_accuracy',
        'result_train_true_positive': 'result_train_true_positive',
        'result_train_false_positive': 'result_train_false_positive',
        'result_test_row_loaded': 'result_test_row_loaded',
        'result_test_row_filtered': 'result_test_row_filtered',
        'result_test_accuracy': 'result_test_accuracy',
        'result_test_true_positive': 'result_test_true_positive',
        'result_test_false_positive': 'result_test_false_positive',
        'result_test_accuracy': 'result_test_accuracy'
    };

    // Assuming the Load Data table has two columns: Parameter and Value
    var trainResultsDataTable = $('#results-data-table tbody');

    // Clear existing rows in the table
    trainResultsDataTable.empty();

    // Iterate over the specified parameters and add rows to the table
    for (var key in parameterMapping) {
        if (parameterMapping.hasOwnProperty(key) && rowData.hasOwnProperty(key)) {
            var value = rowData[key];

            if (value === null || value === 'null') {
                value = 0;
            }

            if (value === null || value === 'null') {
                value = 'null';
            }
            var row = '<tr><td>' + parameterMapping[key] + '</td><td class="uneditable" data-value="' + value + '">' + value + '</td></tr>';
            trainResultsDataTable.append(row);
        }
    }
}



function fetchData(url, rowData, tableId, updateTableFunction) {
    $.ajax({
        url: url,
        method: 'GET',
        data: rowData,
        success: function (data) {
            // console.log(`Received data from ${url}:`, data);
            if (data && data.success) {
                updateTableFunction(data.row_data, tableId);
            } else {
                console.error(`Error fetching data from ${url}:`, data ? data.message : 'No data received');
            }
        },
        error: function (error) {
            console.error('AJAX request failed:', error);
        }
    });
}

});
