namespace desktop_client
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            listBoxCourses = new ListBox();
            listBoxDepartments = new ListBox();
            listBoxStudents = new ListBox();
            buttonLoadDepartments = new Button();
            buttonLoadStudents = new Button();
            groupBoxStats = new GroupBox();
            labelStudentCount = new Label();
            groupBoxStats.SuspendLayout();
            SuspendLayout();
            // 
            // listBoxCourses
            // 
            listBoxCourses.BackColor = Color.FromArgb(128, 128, 255);
            listBoxCourses.FormattingEnabled = true;
            listBoxCourses.Location = new Point(12, 210);
            listBoxCourses.Name = "listBoxCourses";
            listBoxCourses.Size = new Size(398, 104);
            listBoxCourses.TabIndex = 1;
            listBoxCourses.SelectedValueChanged += listBoxCourses_SelectedIndexChanged;
            // 
            // listBoxDepartments
            // 
            listBoxDepartments.BackColor = Color.FromArgb(128, 128, 255);
            listBoxDepartments.FormattingEnabled = true;
            listBoxDepartments.Location = new Point(12, 89);
            listBoxDepartments.Name = "listBoxDepartments";
            listBoxDepartments.Size = new Size(391, 104);
            listBoxDepartments.TabIndex = 2;
            listBoxDepartments.SelectedIndexChanged += listBoxDepartments_SelectedIndexChanged;
            // 
            // listBoxStudents
            // 
            listBoxStudents.BackColor = Color.FromArgb(128, 128, 255);
            listBoxStudents.FormattingEnabled = true;
            listBoxStudents.Location = new Point(12, 334);
            listBoxStudents.Name = "listBoxStudents";
            listBoxStudents.Size = new Size(398, 104);
            listBoxStudents.TabIndex = 3;
            // 
            // buttonLoadDepartments
            // 
            buttonLoadDepartments.BackColor = Color.FromArgb(128, 255, 255);
            buttonLoadDepartments.Location = new Point(89, 36);
            buttonLoadDepartments.Name = "buttonLoadDepartments";
            buttonLoadDepartments.Size = new Size(206, 29);
            buttonLoadDepartments.TabIndex = 4;
            buttonLoadDepartments.Text = "Load All Departments";
            buttonLoadDepartments.UseVisualStyleBackColor = false;
            buttonLoadDepartments.Click += buttonLoadDepartments_Click;
            // 
            // buttonLoadStudents
            // 
            buttonLoadStudents.BackColor = Color.FromArgb(128, 255, 255);
            buttonLoadStudents.Location = new Point(57, 288);
            buttonLoadStudents.Name = "buttonLoadStudents";
            buttonLoadStudents.Size = new Size(237, 29);
            buttonLoadStudents.TabIndex = 5;
            buttonLoadStudents.Text = "Show the nuber of  students";
            buttonLoadStudents.UseVisualStyleBackColor = false;
            buttonLoadStudents.Click += buttonLoadStudents_Click;
            // 
            // groupBoxStats
            // 
            groupBoxStats.BackColor = Color.FromArgb(192, 192, 255);
            groupBoxStats.Controls.Add(labelStudentCount);
            groupBoxStats.Controls.Add(buttonLoadStudents);
            groupBoxStats.Location = new Point(439, 89);
            groupBoxStats.Name = "groupBoxStats";
            groupBoxStats.Size = new Size(357, 349);
            groupBoxStats.TabIndex = 7;
            groupBoxStats.TabStop = false;
            groupBoxStats.Text = "groupBox1";
            groupBoxStats.Enter += groupBoxStats_Enter;
            // 
            // labelStudentCount
            // 
            labelStudentCount.AutoSize = true;
            labelStudentCount.BackColor = Color.FromArgb(128, 128, 255);
            labelStudentCount.Location = new Point(0, 84);
            labelStudentCount.Name = "labelStudentCount";
            labelStudentCount.Size = new Size(143, 20);
            labelStudentCount.TabIndex = 0;
            labelStudentCount.Text = "Number of students:";
            labelStudentCount.Click += label1_Click_1;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(192, 255, 255);
            ClientSize = new Size(800, 450);
            Controls.Add(groupBoxStats);
            Controls.Add(buttonLoadDepartments);
            Controls.Add(listBoxStudents);
            Controls.Add(listBoxDepartments);
            Controls.Add(listBoxCourses);
            Name = "Form1";
            Text = "Form1";
            groupBoxStats.ResumeLayout(false);
            groupBoxStats.PerformLayout();
            ResumeLayout(false);
        }

        #endregion
        private ListBox listBoxCourses;
        private ListBox listBoxDepartments;
        private ListBox listBoxStudents;
        private Button buttonLoadDepartments;
        private Button button1;
        private Button buttonLoadStudents;
        private GroupBox groupBoxStats;
        private Label labelStudentCount;
    }
}