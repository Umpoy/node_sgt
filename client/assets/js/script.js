/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);
/**
 * Define all global variables here.  
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
var student_array = [];
var gradeAverage = 0;

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp() {
    addClickHandlersToElements();
    getData();
}
/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements() {
    $('.add').on('click', handleAddClicked);
    $('tbody').on('click', '.btn', deleteStudentRow);
    $('.toggle').on('click', function () {
        $("#signup").toggle();
        $("#login").toggle();
    });
    $('.cancel').on('click', handleCancelClick);
    $('.getData').on('click', getData);
}
/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked() {
    addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick() {
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent() {
    let newStudent = {
        name: $('#studentName').val(),
        course: $('#course').val(),
        grade: $('#studentGrade').val(),
    }
    let inputValid = true
    if (newStudent.name === '' || Number(newStudent.name)) {
        inputValid = false;
        $('#studentName').parent().removeClass('has-.parent()success');
        $('#studentName').parent().addClass('has-error');
    } else {
        $('#studentName').parent().removeClass('has-error');
        $('#studentName').parent().addClass('has-success');
    }
    if (newStudent.course === '' || Number(newStudent.course)) {
        inputValid = false;
        $('#course').parent().removeClass('has-success');
        $('#course').parent().addClass('has-error');
    } else {
        $('#course').parent().removeClass('has-error');
        $('#course').parent().addClass('has-success');
    }
    if (parseInt(newStudent.grade)) {
        $('#studentGrade').parent().removeClass('has-error');
        $('#studentGrade').parent().addClass('has-success');
    } else {
        inputValid = false;
        $('#studentGrade').parent().removeClass('has-success');
        $('#studentGrade').parent().addClass('has-error');
    }
    if (inputValid === false) {
        return
    } else {
        sendToDataBase(newStudent);
        student_array.push(newStudent);
        updateStudentList(newStudent);
        clearAddStudentFormInputs(true);
        $('div .form-group').removeClass('has-error');
    }
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(click) {
    $('div .form-group').removeClass('has-error');
    if (!click) {
        $('div .form-group').removeClass('has-success');
    }
    $('input').val('');
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(newStudent) {
    var tableRow = $('<tr>');
    var tableName = $('<td>').text(newStudent.name)
    var tabelCourse = $('<td>').text(newStudent.course)
    var tableGrade = $('<td>').text(newStudent.grade)
    var tableButton = $('<button>').addClass('btn btn-danger delete').text('Delete')
    var tableDelete = $('<td>').append(tableButton)
    tableRow.append(tableName, tabelCourse, tableGrade, tableDelete)
    $('tbody').append(tableRow);

}
/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(newStudent) {
    getData();
    renderStudentOnDom(newStudent);
    calculateGradeAverage(student_array);
    renderGradeAverage(gradeAverage);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_array) {
    var studentGradeTotoal = 0;
    gradeAverage = 0;
    if (student_array[0] === undefined) {
        return
    }
    for (var i = 0; i < student_array.length; i++) {
        studentGradeTotoal += parseInt(student_array[i].grade)
    }
    gradeAverage = studentGradeTotoal / student_array.length;
    return gradeAverage
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(number) {
    $('.avgGrade').text(Math.floor(number))
}

/***************************************************************************************************
 * sendToDataBase - sends student information to server side
 * @param: {student} an object with students information
 * @returns {undefined} none
 */
function sendToDataBase(newStudent) {
    $.ajax({
        url: './updateDatabase.php',
        data: {
            'name': newStudent.name,
            'grade': newStudent.grade,
            'course': newStudent.course
        },
        type: 'post',
        success: function (output) {
        }
    });
}

/***************************************************************************************************
 * getData - grabs data from database and renders it to the DOM
 * @param: {undefined} none
 * @returns [array] array of student objects with information
 */
function getData() {
    $.ajax({
        dataType: 'json',
        url: 'grabFromDatabase.php',
        success: function (server) {
            console.log("server: ", server);
            $('tbody').find('tr').remove()
            student_array = server;
            console.log("student 1:", student_array[0]);
            for (var i = 0; i < server.length; i++) {
                var newStudent = server[i];
                renderStudentOnDom(newStudent)
            }
            calculateGradeAverage(student_array);
            renderGradeAverage(gradeAverage);

        }
    });
}

/***************************************************************************************************
 * deleteStudentRow - deletes student from data base
 * @param: {undefined} none
 * @returns update data after student is deleted
 */
function deleteStudentRow() {
    var indexOfStudent = $(this).parent().parent().index();
    var idOfStudent = student_array[indexOfStudent].id
    deleteStudentFromDB(idOfStudent);
    student_array.splice(indexOfStudent, 1);
    $(this).parent().closest('tr').remove();
    calculateGradeAverage(student_array);
    renderGradeAverage(gradeAverage);
}

/***************************************************************************************************
 * deleteStudenFromDB - deteles student from database
 * @param: {id} takes student's id 
 * @returns {} none
 */
function deleteStudentFromDB(id) {
    $.ajax({
        url: "deleteFromDatabase.php",
        data: { id },
        type: 'post',
        success: function () {
            console.log("Student Deleted");
        }
    })
}








