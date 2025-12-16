using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace desktop_client
{
    public partial class Form1 : Form
    {
        private Service service = new Service();
        private List<Department> departments = new List<Department>();
        private List<Course> courses = new List<Course>();
        private List<Course> filteredCourses = new List<Course>();



        public Form1()
        {

            InitializeComponent();
        }

        private async void buttonLoadDepartments_Click(object sender, EventArgs e)
        {
            listBoxDepartments.Items.Clear();
            listBoxCourses.Items.Clear();
            listBoxStudents.Items.Clear();

            try
            {
                // încarc departamentele
                departments = await service.GetDepartmentsAsync() ?? new List<Department>();

                // încarc TOATE cursurile
                courses = await service.GetCoursesAsync() ?? new List<Course>();

                // încarc studentii pentru FIECARE curs
                foreach (var c in courses)
                {
                    if (c.Id.HasValue)
                        c.Students = await service.GetStudentsByCourseId(c.Id.Value);
                }
             

                // afișez departamentele
                if (departments.Count == 0)
                    listBoxDepartments.Items.Add("No departments found!");
                else
                {
                    foreach (var dept in departments)
                        listBoxDepartments.Items.Add($"{dept.Id?.ToString() ?? "0"} - {dept.Name}");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error loading departments: " + ex.Message);
            }
        }


        // Filtrăm cursurile după departamentul selectat
        private void listBoxDepartments_SelectedIndexChanged(object sender, EventArgs e)
        {
            int index = listBoxDepartments.SelectedIndex;
            if (index >= 0 && index < departments.Count)
            {
                Department selectedDept = departments[index];

                filteredCourses = courses
                    .Where(c => c.DepartmentId == selectedDept.Id)
                    .ToList();

                listBoxCourses.Items.Clear();
                listBoxStudents.Items.Clear();

                if (filteredCourses.Count == 0)
                {
                    listBoxCourses.Items.Add("No courses in this department!");
                }
                else
                {
                    foreach (var course in filteredCourses)
                        listBoxCourses.Items.Add($"{course.Id?.ToString() ?? "0"} - {course.Name}");
                }
            }
        }


        //  Afișăm studenții pentru cursul selectat
        private void listBoxCourses_SelectedIndexChanged(object sender, EventArgs e)
        {
            int index = listBoxCourses.SelectedIndex;
            if (index >= 0 && index < filteredCourses.Count)
            {
                Course selectedCourse = filteredCourses[index];

                listBoxStudents.Items.Clear();

                if (selectedCourse.Students == null || selectedCourse.Students.Count == 0)
                {
                    listBoxStudents.Items.Add("No students in this course!");
                }
                else
                {
                    foreach (var student in selectedCourse.Students)
                        listBoxStudents.Items.Add($"{student.Id?.ToString() ?? "0"} - {student.Name} ({student.Email})");
                }
            }
        }
        private void buttonLoadStudents_Click(object sender, EventArgs e)
        {
            int deptIndex = listBoxDepartments.SelectedIndex;

            if (deptIndex < 0 || deptIndex >= departments.Count)
            {
                labelStudentCount.Text = "Select a department first!";
                return;
            }

            Department selectedDept = departments[deptIndex];

            var deptCourses = courses.Where(c => c.DepartmentId == selectedDept.Id).ToList();

            if (deptCourses.Count == 0)
            {
                labelStudentCount.Text = "This department has no courses!";
                return;
            }
            int totalStudents = deptCourses.Sum(c => c.Students?.Count ?? 0);

       
            labelStudentCount.Text =
                $"Toți studenții din departamentul '{selectedDept.Name}':\n" +
                $"➡ Total: {totalStudents} studenți";
        }


        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private void groupBoxStats_Enter(object sender, EventArgs e)
        {

        }
    }
}
